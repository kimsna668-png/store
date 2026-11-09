const productStore = require('../services/productStore');
const { prisma } = require('../config/db');

// GET /api/products
const getAllProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, isFeatured, sort } = req.query;
    const products = productStore.listProducts({
      category,
      search,
      minPrice,
      maxPrice,
      isFeatured: isFeatured !== undefined ? isFeatured === 'true' : undefined,
      sort
    });

    res.json({
      status: 'success',
      count: products.length,
      data: { products }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:slug
const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = productStore.getProductBySlug(slug);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: `Product with slug '${slug}' not found.`
      });
    }

    // Get related products in the same category or featured
    const related = productStore.listProducts({ category: product.category?.slug })
      .filter(p => p.id !== product.id)
      .slice(0, 4);

    res.json({
      status: 'success',
      data: {
        product,
        related
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/id/:id
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = productStore.getProductById(id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: `Product with ID '${id}' not found.`
      });
    }

    res.json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/admin/products (Protected)
const createProduct = async (req, res, next) => {
  try {
    const { title, price, categoryId, description } = req.body;

    if (!title || price === undefined || !categoryId) {
      return res.status(400).json({
        status: 'error',
        message: 'Product title, price, and categoryId are required fields.'
      });
    }

    const newProduct = productStore.createProduct(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully.',
      data: { product: newProduct }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/products/:id (Protected)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = productStore.updateProduct(id, req.body);

    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: `Product with ID '${id}' not found.`
      });
    }

    res.json({
      status: 'success',
      message: 'Product updated successfully.',
      data: { product: updated }
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/products/:id (Protected)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = productStore.deleteProduct(id);

    if (!success) {
      return res.status(404).json({
        status: 'error',
        message: `Product with ID '${id}' not found.`
      });
    }

    res.json({
      status: 'success',
      message: 'Product deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

