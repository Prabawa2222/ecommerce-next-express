const { Model } = require("sequelize");

console.log("from sequelize",sequelize);

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "Users",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID v4
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          role: {
            type: DataTypes.ENUM(["ADMIN", "CASHIER", "USER"]),
            defaultValue: "USER"
          },
        },
        {
          tableName: "users",
          timestamps: true, // Sequelize will automatically create `createdAt` and `updatedAt` columns
        }
    );

    return Users
}

module.exports = User;
