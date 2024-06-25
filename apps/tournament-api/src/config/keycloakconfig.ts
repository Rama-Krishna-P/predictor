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

export default keycloakConfig