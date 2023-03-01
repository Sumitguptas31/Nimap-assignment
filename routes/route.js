const express = require("express")
const router = express.Router()
const categoryController = require("../Controller/categoryController");
const productController = require("../Controller/productController");


router.post('/category', categoryController.CreateCategory);
router.get('/category/:id', categoryController.CategoryById);
router.put("/category/:id",categoryController.UpdateCategoryById);
router.delete("/category/:id",categoryController.DeleteCategoryById);
router.post('/product', productController.CreateProduct);
router.get('/product/:id', productController.ProductById);
router.put('/product/:id', productController.UpdateProductById);
router.delete("/product/:id", productController.DeleteProductById);
router.get('/product', productController.allProducts);

module.exports = router;