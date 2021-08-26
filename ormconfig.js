// eslint-disable-next-line @typescript-eslint/no-var-requires
const Url = require('url-parse');
const DATABASE_URL = new Url(process.env.DATABASE_URL);

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || DATABASE_URL.hostname,
  port: +process.env.DB_PORT || DATABASE_URL.port,
  username: process.env.DB_USERNAME || DATABASE_URL.username,
  password: process.env.DB_PASSWORD || DATABASE_URL.password,
  database: process.env.DB_DATABASE || DATABASE_URL.pathname.substr(1),
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  ssl: process.env.DATABASE_URL
    ? {
        rejectUnauthorized: false,
      }
    : false,
};
