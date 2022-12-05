const createPostgresDb = require('./src/db/postgres');
const createApp = require('./src/setup/compositionroot');
const db = createPostgresDb('postgres', 5432);

const app = createApp(db);

module.exports = app;
