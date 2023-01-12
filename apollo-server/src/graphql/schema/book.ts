import { objectType } from 'nexus'

export const Book = objectType({
    name: 'Book',
    definition(t) {
        t.id('id')
        t.string('title')
        t.string('datePublished')
    },
})