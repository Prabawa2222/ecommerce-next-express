import { faker } from '@faker-js/faker'; // Corrected import
import { v4 as uuidv4 } from 'uuid'; // Import the uuid package to generate UUIDs
import Product from "../products/productModel.js"; // Adjust the path as needed

// Product seeder up function
export const up = async (queryInterface, Sequelize) => {
  const products = [];

  // Generate fake products
  for (let i = 0; i < 10; i++) {
    products.push({
      id: uuidv4(), // Generate a new UUID using the uuid package
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 1, max: 100 }), // Corrected to use faker.number.int()
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Insert the generated products into the Product table (adjusted table name)
  await queryInterface.bulkInsert("Product", products, {}); // Use the correct table name
  console.log("Product seeding successful.");
};

// Product seeder down function (for rollback)
export const down = async (queryInterface, Sequelize) => {
  // Delete all products (to rollback)
  await queryInterface.bulkDelete("Product", null, {}); // Use the correct table name
  console.log("Product seeding rollback successful.");
};
