import Product from "./productModel.js";

// Get Product
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).send({
      success: true,
      statusCode: 200,
      products,
    });
  } catch (error) {
    res.status(500).send({
      error,
      status: 500,
      message: "Interval server error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
      attributes: ["productName", "description", "price", "stock"],
    });

    if (!product) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: `Product not found with ID: ${id}`,
      });
    }

    res.status(200).send({
      success: true,
      statusCode: 200,
      product,
    });
  } catch (error) {
    res.status(500).send({
      error,
      status: 500,
      message: "Interval server error",
    });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const { productName, description, price, stock } = req.body;

    const newProduct = await Product.create({
      productName,
      description,
      price,
      stock,
    });

    res.status(201).send({
      success: true,
      statusCode: 201,
      message: "Product has been created successfully",
      newProduct: {
        id: newProduct.id,
        productName: newProduct.productName,
        price: newProduct.price,
        stock: newProduct.stock,
      },
    });
  } catch (error) {
    res.status(500).send({
      error,
      status: 500,
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = Product.destroy({
      where: {
        id,
      },
    });

    if (!product) {
      res.status(404).send({
        success,
        statusCode: 404,
        message: `Product not found with ID: ${id}`,
      });
    }

    res.status(200).send({
      success: true,
      statusCode: 200,
      message: `Product has been deleted successfully`,
    });
  } catch (error) {
    res.status(500).send({
      error,
      status: 500,
      message: "Internal server error",
    });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params.uid;
    const { productName, description, price, stock } = req.body;

    const product = await Product.findOne(id, {
      productName,
      description,
      price,
      stock,
    });

    if (!product) {
      res.status(404).send({
        success,
        statusCode: 404,
        message: `Product not found with ID : ${id}`,
      });
    }

    const updatedProduct = await Product.update(id, {
      productName,
      description,
      price,
      stock,
    });

    res.status(200).send({
      success,
      status: 200,
      message: `Product has been updated successfully`,
      updatedProduct,
    });
  } catch (error) {
    return res.status(500).send({
      error,
      status: 500,
      message: "Internal server error",
    });
  }
};
