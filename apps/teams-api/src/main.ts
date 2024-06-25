import express from 'express';
import 'reflect-metadata';
import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from './knexfile';
import teamRoutes from './routes/TeamRoutes';
import Keycloak from "keycloak-connect";

const app = express();

const knex = Knex(knexConfig);
Model.knex(knex);

const keycloakConfig = {
  realm: 'predictor',
  'auth-server-url': 'http://localhost:8080/',
  'ssl-required': 'false',
  resource: 'backend',
  credentials: {
    secret: 'xzSEq7Mo8W74QkNGga6iYp07pyDh6069',
  },
  'confidential-port': 0,
  'bearer-only': true,
};

const keycloak = new Keycloak({}, keycloakConfig)

app.use(express.json());

app.use(keycloak.middleware())

app.use('/api', keycloak.protect('realm:admin'), teamRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
