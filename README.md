# React scaffolding

This is meant to provide a simple scaffold to get up and running with a standalone Apollo server and a Postgres database as a dummy backend for a React app to interact with

## Prerequisites

  - Docker
  - Docker Compose

## Usage

```
$ docker compose up
```

## Provided Components

This repository will, at a high level, provide:
  - A PostgreSQL database seeded with some initial data;
  - A standalone Apollo server (accessible at http://127.0.0.1:4000) with some basic queries and mutations, and with the configuration to interact with the seeded database; and
  - A React client application (accessible at http://127.0.0.1:3000) which a user can interact with and which is configured to communicate to the Apollo server.

This all comes with the (probs obvious) caveat that this is a toy example to demonstrate:
  - How to interact with a backend database using Objection.js and knex;
  - How to stub out GraphQL objects, queries, and mutations with Nexus.js; and
  - How to interact with an upstream GraphQL API in the context of a React application.

It's not meant to be production-ready. It's not meant to be secure. It's not meant to include any test suites. Sooooo yeah, just keep that in mind.
