import { faker } from "@faker-js/faker"; // Ensure you have faker installed
import { v4 as uuidv4 } from 'uuid'; // Import the uuid package to generate UUIDs
import Users from "../users/usersModel.js";

// User seeder up function
export const up = async (queryInterface, Sequelize) => {
  const users = [];

  // Generate fake users
  for (let i = 0; i < 10; i++) {
    users.push({
      id: uuidv4(),
      name: faker.person.fullName(), // Corrected to use fullName method
      email: faker.internet.email(),
      password: faker.internet.password(), // You should hash the password before saving it in a real application
      role: faker.helpers.arrayElement(["ADMIN", "CASHIER", "USER"]), // Random role selection
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Insert the generated users into the Users table
  await queryInterface.bulkInsert("Users", users, {});
  console.log("User seeding successful.");
};

// User seeder down function (for rollback)
export const down = async (queryInterface, Sequelize) => {
  // Delete all users (to rollback)
  await queryInterface.bulkDelete("Users", null, {});
  console.log("User seeding rollback successful.");
};
