<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

I love [Nest.js](https://github.com/nestjs/nest), but I hate writing the same code over and over again. So this boilerplate includes some features that will help you bootstrap a backend a lot faster:

- Fastify (express is trash, and slow)
- TypeORM (with ormconfig.js and migrations scripts)
- Users table
- Authentication (JWT)
- class-validator to validate DTOs
- Procfile for Heroku (optional)

## Installation

Create a database (I recommend using docker)

```bash
docker run --name container_name -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Run migrations

```bash
yarn migration:run
```

Install packages

```bash
yarn
```

Start server

```bash
yarn start:dev
```

## Migrations scripts

Show migrations

```bash
yarn migration:show
```

Generate new migration based on changes made to \*.entity.ts files

```bash
yarn migration:generate migrationName
```

Run migrations

```bash
yarn migration:run
```

Revert migration

```bash
yarn migration:revert
```
