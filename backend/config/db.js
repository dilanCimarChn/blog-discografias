const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { databaseConfig } = require('./environment');
module.exports = require('mysql2').createPool(databaseConfig());
