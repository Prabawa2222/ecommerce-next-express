import { Sequelize } from "sequelize";
import User from "../users/usersModel.js";
import db from "../config/db.js";
import Product from "../products/productModel.js";

const { DataTypes } = Sequelize;

const Orders = db.define(
  "Orders",
  {
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Pending", "Completed", "Shipped"],
      defaultValue: "Pending",
    },
  },
  {
    timestamps: true,
    tableName: "Orders",
  }
);

const OrderItem = db.define(
  "OrderItem",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
    tableName: "OrderItems",
  }
);

// Relationships
Orders.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});
User.hasMany(Orders, { foreignKey: "userId", as: "orders" });

OrderItem.belongsTo(Orders, {
  foreignKey: "orderId",
  as: "order",
  onDelete: "CASCADE",
});
Orders.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
  onDelete: "CASCADE",
});

OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
  onDelete: "CASCADE",
});
Product.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
  onDelete: "CASCADE",
});

export { Orders, OrderItem };
