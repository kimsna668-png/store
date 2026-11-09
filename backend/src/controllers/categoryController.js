const productStore = require('../services/productStore');

// GET /api/categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = productStore.listCategories();
    res.json({
      status: 'success',
      count: categories.length,
      data: { categories }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/categories/:slug
const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = productStore.getCategoryBySlug(slug);

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: `Category '${slug}' not found.`
      });
    }

    res.json({
      status: 'success',
      data: { category }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/admin/categories
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: 'error',
        message: 'Category name is required.'
      });
    }

    const newCategory = productStore.createCategory(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Category created successfully.',
      data: { category: newCategory }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/categories/:id
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = productStore.updateCategory(id, req.body);

    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: `Category with ID '${id}' not found.`
      });
    }

    res.json({
      status: 'success',
      message: 'Category updated successfully.',
      data: { category: updated }
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/categories/:id
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = productStore.deleteCategory(id);

    if (!success) {
      return res.status(404).json({
        status: 'error',
        message: `Category with ID '${id}' not found.`
      });
    }

    res.json({
      status: 'success',
      message: 'Category deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};

