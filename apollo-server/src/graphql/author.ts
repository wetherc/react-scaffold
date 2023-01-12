import { objectType } from 'nexus'

export const Author = objectType({
    name: 'Author',
    definition(t) {
        t.id('id')
        t.string('firstName')
        t.string('lastName')
    },
})