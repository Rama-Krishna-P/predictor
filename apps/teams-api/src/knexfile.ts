import type { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './assets/team-api.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
};

export default config;
