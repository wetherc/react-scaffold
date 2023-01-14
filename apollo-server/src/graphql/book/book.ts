import { objectType } from 'nexus'
import Objection, { Model } from 'objection'
import { ObjectionAuthor } from '../author/author.js'

export const Book = objectType({
    name: 'Book',
    definition(t) {
        t.id('id')
        t.string('title')
        t.int('publicationDate')
        t.field('author', {
            type: 'Author',
            async resolve(root, args, ctx) {
                return ObjectionAuthor.query()
                    .findById(root.authorId)
                    .first()
            }
        })
    },
})

export class ObjectionBook extends Model {
    id!: string
    title!: string
    publicationDate!: number
    authorId!: string
    author: ObjectionAuthor

    static tableName = 'books'
    static get modifiers() {
        return {
            filterAuthor(builder, args) {
                let whereArgs = {};
                if ('firstName' in args) {
                    whereArgs = {'authors.firstName': args.firstName};
                }
                if ('lastName' in args) {
                    whereArgs = {
                        'authors.lastName': args.lastName,
                        ...whereArgs,
                    }
                }

                builder.withGraphJoined('authors')
                    .where(whereArgs);
            }
        }
    }
    
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