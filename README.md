# React scaffolding

This is meant to provide a simple scaffold to get up and running with a standalone Apollo server and a Postgres database as a dummy backend for a React app to interact with

## Prerequisites

  - Docker
  - Docker Compose

## Usage

```
$ docker compose up
```

## Autogen gql

This requires that the Apollo server be running
```
pnpm graphql-code-generator --config ./apollo-server/codegen.ts
```