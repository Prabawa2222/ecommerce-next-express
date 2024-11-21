import { Sequelize } from 'sequelize';
import Product from './src/products/productModel.js';
import Users from './src/users/usersModel.js';
import db from './src/config/db.js';

// Import the seeder functions
import { up as productSeederUp, down as productSeederDown } from './src/seeders/productSeeder.js';
import { up as userSeederUp, down as userSeederDown } from './src/seeders/userSeeder.js';

// Initialize Sequelize with your custom setup
const sequelize = db;

// This function will run the seeders
const runSeeders = async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Run Product Seeder
    await productSeederUp(sequelize.getQueryInterface(), Sequelize);
    console.log('Product seeding completed.');

    // Run User Seeder
    await userSeederUp(sequelize.getQueryInterface(), Sequelize);
    console.log('User seeding completed.');

    // Close the connection
    await sequelize.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error occurred while running seeders:', error);
    await sequelize.close();
  }
};

// Call the runSeeders function to execute the seeders
runSeeders();
