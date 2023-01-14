import { extendType, inputObjectType } from 'nexus'
import { Utils } from '../../typeDefs.js'
import { Book, ObjectionBook } from './book.js'


export const BookInputType = inputObjectType({
    name: 'BookInputType',
    definition(t) {
        t.nonNull.string('title')
        t.nonNull.int('publicationDate')
        t.nonNull.string('authorId')
    }
})

export const AddBookMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('addBook', {
            type: Book,
            args: { data: BookInputType },
            async resolve(root, args, ctx) {
                const results = ObjectionBook.transaction(async trx => {
                    const book = await ObjectionBook.query(trx)
                        .insertAndFetch({
                            title: args.data.title,
                            publicationDate: args.data.publicationDate,
                            authorId: args.data.authorId
                        })
                        .first();
                    
                    return book
                })

                return results
            }
        })
    }
})