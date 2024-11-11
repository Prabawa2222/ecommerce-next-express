import Users from "../users/usersModel.js";
import Orders from "./orderModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({ include: Users });

    res.status(200).send({
      success: true,
      statusCode: 200,
      orders,
    });
  } catch (error) {
    res.status(500).send({
      error,
      status: 500,
      message: "Internal server error",
    });
  }
};

// Still Error Need to be fixed
export const createOrder = async (req, res) => {
  try {
    const { userId, totalPrice, status } = req.body;

    // Check if userId exists in the Users table
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    const newOrder = await Orders.create({ userId, totalPrice, status });

    res.status(200).send({
      success: true,
      statusCode: 200,
      newOrder,
    });
  } catch (error) {
    console.error(error); // Log the error for better debugging
    res.status(500).send({
      error,
      status: 500,
      message: "Internal server error",
    });
  }
};

// To be updated with update order status
