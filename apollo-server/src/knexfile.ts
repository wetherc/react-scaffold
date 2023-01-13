import { knexSnakeCaseMappers } from "objection"

export const knexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'db',
      port: 5432,
      user: 'postgres',
      password: 'example',
    },
    pool: {
      min: 2,
      max: 10,
    },
    ...knexSnakeCaseMappers()
  },
}