import { makeSchema } from 'nexus'
import { Request } from 'express'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { Model } from 'objection'
import Knex from 'knex'
import { knexConfig } from './knexfile.js'
import path from 'path'
import { fileURLToPath } from 'url'
import * as types from './graphql/index.js'


const knex = Knex(knexConfig.development)
Model.knex(knex)

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, '../schema.graphql'),
    typegen: path.join(__dirname, 'typegen.js'),
  },
  sourceTypes: {
    modules: [
      {
        module: path.join(__dirname, 'typeDefs.js'),
        alias: 't',
      },
    ],
  },
  contextType: {
    module: path.join(__dirname, 'context.js'),
    export: 'Context',
  },
})

const context = async ({ req }: { req: Request }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || ''
  return null
}

const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
