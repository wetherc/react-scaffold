import { extendType, inputObjectType } from 'nexus'
import { Utils } from '../../typeDefs.js'
import { Author, ObjectionAuthor } from './author.js'


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