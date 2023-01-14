import { extendType, stringArg, nonNull } from 'nexus'
import { Utils } from '../../typeDefs.js'
import { Author, ObjectionAuthor } from './author.js'

export const ListAuthorsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('listAuthors', {
            type: Author,
            args: {
                firstName: stringArg(),
                lastName: stringArg(),
            },
            async resolve(root, args, ctx) {
                let query = ObjectionAuthor.query();
                if (Object.keys(args).length > 0) {
                    query = query.where(args)
                }
                const result = await query.orderBy([
                    {column: 'lastName'},
                    {column: 'firstName'}
                ]);
                return result;
            },
        });
    },
})