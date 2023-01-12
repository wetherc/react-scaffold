import { makeSchema } from 'nexus'
import { Request } from 'express'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import path from 'path'
import * as types from './graphql/schema/index.js'


const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, '../schema.graphql'),
    typegen: path.join(__dirname, 'typegen.ts'),
  },
  sourceTypes: {
    modules: [
      {
        module: path.join(__dirname, 'typeDefs.ts'),
        alias: 't',
      },
    ],
  },
  contextType: {
    module: path.join(__dirname, 'context.ts'),
    export: 'Context',
  },
  prettierConfig: require.resolve('../.prettierrc'),
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
