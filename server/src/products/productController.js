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
      // attributes: ["name", "description", "price", "stock"], // get ID, tampilkan semua karena akan berguna property lainya
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
    const { name, description, price, stock } = req.body;  // rename productName to name

    const newProduct = await Product.create({
      name,                                                 // rename productName to name
      description,
      price,
      stock,
    });

    res.status(201).send({
      success: true,
      statusCode: 201,
      message: "Product has been created successfully",
      product: newProduct                                   // return seluruh product property, bisa berguna pada proses bisnin lain
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

    const product = await Product.destroy({             // add await
      where: {
        id,
      },
    });

    if (product === 0) {                              // handle if id doesn't exist
      return res.status(404).send({
        success: false,
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
    const { id } = req.params;                                  // remove .uid for destruction
    const { name, description, price, stock } = req.body;       // productName => name

    const product = await Product.findOne({                     // handle findById
      where: {
        id
      }
    })

    if (!product) {
      return res.status(404).send({
        success: false,                               // reassigne value of success
        statusCode: 404,
        message: `Product not found with ID : ${id}`,
      });
    }

    const updatedProduct = await Product.update({
      name,                                           // productName => name
      description,
      price,
      stock,
    }, {where: {id}});                                 // update in suqelize are (value, id)

    res.status(200).send({
      success: true,                                  // reassign value success
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
