import { extendType, stringArg, nonNull } from 'nexus'
import { Utils } from '../typeDefs.js'
import { Book, ObjectionBook } from './schema/book.js'
import { Author, ObjectionAuthor } from './schema/author.js'

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
                const result = await query.orderBy('title');
                return result;
            },
        });
    },
})

export const GetBookQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('getBook', {
            type: Book,
            args: {
                title: nonNull(stringArg()),
            },
            async resolve(root, args, ctx) {
                return await ObjectionBook.query()
                    .where('title', 'like', `%${args.title}%`)
                    .orderBy('title');
            },
        });
    },
})

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