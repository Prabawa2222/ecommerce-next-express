const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];

// Database initialization
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
  }
);

// Test connection
const syncDB = async () => {
  try {
    console.log("Synchronizing database...");
    await sequelize.sync({alter: true}); // Sync models with DB
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error.message || error);
    throw error; // Rethrow to stop execution
  }
};

module.exports = {
  sequelize,
  syncDB,
};
