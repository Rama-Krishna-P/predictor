/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata'
import express from 'express';
import { TeamsController } from './controllers/teams-controller';

import * as config from './knexfile'
import knex from 'knex';

let db = knex(config["development"])

const app = express();
app.use(express.json())

app.use('/api/teams', TeamsController.getRoutes())

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
