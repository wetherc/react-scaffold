import { objectType } from 'nexus'
import { Model } from 'objection'
import { ObjectionBook } from '../book/book.js'

export const Author = objectType({
    name: 'Author',
    definition(t) {
        t.id('id')
        t.string('firstName')
        t.string('lastName')
    },
})

export class ObjectionAuthor extends Model {
    id!: string
    firstName!: string
    lastName!: string

    static tableName = 'authors'
    static relationMappings = () => ({
        books: {
            relation: Model.HasManyRelation,
            modelClass: ObjectionBook,
            join: {
                from: 'authors.id',
                to: 'books.authorId'
            },
        },
    })

}