import { extendType, stringArg } from 'nexus'
import { Utils } from '../typeDefs.js'
import { Book, ObjectionBook } from './schema/book.js'

export const ListBooksQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('listBooks', {
            type: Book,
            args: {
                firstName: stringArg(),
                lastName: stringArg(),
            },
            async resolve(root, args, ctx) {
                let query = ObjectionBook.query();
                if (Object.keys(args).length > 0) {
                    query = query.modify('filterAuthor', args)
                }
                const result = await query.orderBy('publicationDate');
                return result;
            },
        });
    },
})

export const ListBooksForAuthorQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('listBooksForAuthor', {
            type: Book,
            async resolve(root, ctx) {
                return ObjectionBook.query()
                    .orderBy('publicationDate');
            },
        });
    },

})