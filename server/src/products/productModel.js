import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;
const Product = db.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },    
    name: {                       // from productName to name =>  lebih realistis hanya ada satu property nama ditabel ini
      type: DataTypes.STRING,
      allowNull: false,
      unique: true                // buat unique untuk validasi duplikasi product
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Product;
