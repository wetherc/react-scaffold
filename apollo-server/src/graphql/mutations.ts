import { extendType, inputObjectType } from 'nexus'
import { Utils } from '../typeDefs.js'
import { Book, ObjectionBook } from './schema/book.js'
import { Author, ObjectionAuthor } from './schema/author.js'


export const AuthorInputType = inputObjectType({
    name: 'AuthorInputType',
    definition(t) {
        t.nonNull.string('firstName')
        t.nonNull.string('lastName')
    }
})

export const AddAuthorMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('addAuthor', {
            type: Author,
            args: { data: AuthorInputType },
            async resolve(root, args, ctx) {
                const results = ObjectionAuthor.transaction(async trx => {
                    const author = await ObjectionAuthor.query(trx)
                        .insertAndFetch({
                            firstName: args.data.firstName,
                            lastName: args.data.lastName
                        })
                        .first();
                    
                    return author
                })

                return results
            }
        })
    }
})


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