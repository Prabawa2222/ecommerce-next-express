import { Sequelize } from "sequelize";
import configFile from "./config.js"; // Adjusted to ES6 import

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// Database initialization
const db = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
  }
);

export default db;
