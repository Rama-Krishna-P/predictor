import type { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './assets/tournament-api.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
  pool: {
    min: 2,
    max: 10 // Adjust these values based on your workload
  }
};

export default config;
