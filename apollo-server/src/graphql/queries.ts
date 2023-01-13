import { extendType } from 'nexus'
import { Utils } from '../typeDefs.js'
import { Book, ObjectionBook } from './schema/book.js'

export const BookQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('listBooks', {
            type: Book,
            async resolve(root, ctx) {
                return ObjectionBook.query()
                    .orderBy('publicationDate');
            },
        });
    },
})