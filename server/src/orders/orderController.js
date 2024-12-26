import Users from "../users/usersModel.js";
import Product from "../products/productModel.js";
import { Orders, OrderItem } from "./orderModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [
        {
          model: Users,
          as: "user", // Use the alias defined in your model association
          attributes: ["id", "name", "email"], // Fetch specific user fields
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
    });

    res.status(200).send({
      success: true,
      statusCode: 200,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      status: 500,
      message: "Internal server error",
    });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, items, status } = req.body;

    // Check if userId exists in the Users table
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Items are required and should be a non-empty array",
      });
    }

    // Check product validity and calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(400).send({
          success: false,
          message: `Product with ID ${item.productId} not found`,
        });
      }
      if (item.quantity <= 0) {
        return res.status(400).send({
          success: false,
          message: `Invalid quantity for product with ID ${item.productId}`,
        });
      }
      totalPrice += product.price * item.quantity;
    }

    // Create the order
    const newOrder = await Orders.create({ userId, totalPrice, status });

    // Create order items
    const orderItems = items.map((item) => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price || 0, // Assuming price is optional in input
    }));
    await OrderItem.bulkCreate(orderItems);

    // Fetch the complete order details
    const createdOrder = await Orders.findByPk(newOrder.id, {
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
    });

    res.status(201).send({
      success: true,
      statusCode: 201,
      message: "Order created successfully",
      order: createdOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      status: 500,
      message: "Internal server error",
    });
  }
};
