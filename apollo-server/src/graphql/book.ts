import { objectType } from 'nexus'
import Objection, { Model } from 'objection'
import { ObjectionAuthor } from './author.js'

export const Book = objectType({
    name: 'Book',
    definition(t) {
        t.id('id')
        t.string('title')
        t.int('datePublished')
    },
})

export class ObjectionBook extends Model {
    id!: string
    title!: string
    datePublished!: number
    author: ObjectionAuthor

    static tableName = 'books'
    static relationMappings = () => ({
        authors: {
            relation: Model.HasOneRelation,
            modelClass: ObjectionAuthor,
            join: {
                from: 'books.authorId',
                to: 'authors.id'
            },
        },
    })
}