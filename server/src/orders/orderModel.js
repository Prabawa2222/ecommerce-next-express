import { Sequelize } from "sequelize";
import User from "../users/usersModel.js";
import db from "../config/db.js";
import Product from "../products/productModel.js";

const { DataTypes } = Sequelize;
const Orders = db.define(
  "Orders",
  {
    totalPrice: DataTypes.DECIMAL(10, 2),
    status: {
      type: DataTypes.ENUM,
      values: ["Pending", "Completed", "Shipped"],
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = db.define(
  "OrderItem",
  {
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
  },
  {
    timestamps: true,
  }
);

Orders.belongsTo(User, { foreignKey: "userId" });
OrderItem.belongsTo(Orders, { foreignKey: "orderId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

export default { Orders, OrderItem };
