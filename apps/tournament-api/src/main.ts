/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'reflect-metadata'
import express from 'express';
import knex from 'knex';
import { Model } from 'objection';
import matchRoutes from './routes/matchRoutes';
import predictionRoutes from './routes/predictionRoutes';
import knexConfig from './knexfile'
import Keycloak from "keycloak-connect";
import keycloakConfig from './config/keycloakconfig';


const app = express();
const port = process.env.PORT || 3333;


const keycloak = new Keycloak({}, keycloakConfig)

app.use(express.json());
app.use(keycloak.middleware())

// Initialize knex and objection
const knexInstance = knex(knexConfig);
Model.knex(knexInstance);

// Use routes
app.use('/api/matches', matchRoutes);
app.use('/api/predictions', predictionRoutes);


const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
