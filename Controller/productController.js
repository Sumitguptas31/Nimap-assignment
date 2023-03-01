const mongoose = require('mongoose');
const productModel = require('../Model/productModel');
const categoryModel = require('../Model/categoryModel');

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

const CreateProduct = async function (req, res) {
    try {
        const data = req.body;

        const { product_name, category_id, product_price,description,verified } = data;

        if (!isValid(product_name)) {
            return res.status(400).send({ status: false, message: 'Product name is required' })
        }

        if (!isValid(category_id)) {
            return res.status(400).send({ status: false, message: 'category_Id is required' })
        }

        if (!isValidObjectId(category_id)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }
        if (!isValid(product_price)) {
            return res.status(400).send({ status: false, message: 'product_price is required' })
        }
        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: 'description is required' })
        }
       

        let category = await categoryModel.findById(category_id)
        if (!category) {
            return res.status(404).send({ status: falase, massage: "Category does not exist..!!" });
        }

        const newProduct = await productModel.create(data)
        res.status(201).send({ status: true, message: "Success", data: newProduct })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const ProductById = async function (req, res) {

    try {
        const productId = req.params.id;

        if (!isValidObjectId(productId)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        const product = await productModel.findById({ _id: productId });
        if (!product) return res.status(400).send({ status: false, message: "Product is deleted..!!" })

        return res.status(200).send({ status: true, message: "Success", data: product })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const UpdateProductById = async function (req, res) {

    try {
        let data = req.body
        const id = req.params.id;

        if (!Object.keys(data).length > 0) returnres.send({ status: false, message: "Please enter data for updation..!!" })

        if (!isValidObjectId(id)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        const productresent = await productModel.findById({ _id: id })

        if (!productresent) return res.status(404).send({ status: false, message: "Product not found..!!" })


        const update = await productModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })

        if (!update) return res.status(400).send({ status: false, message: "Product is Deleted..!!" })

        return res.status(200).send({ status: true, message: "Success", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const DeleteProductById = async function (req, res) {
    try {
        const  productId  = req.params.id

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).send({ status: false, message: "Product not found" })
        }

        const deleteProduct = await productModel.remove({ _id: productId })
        res.status(200).send({ status: true, message: "product deleted sucessfully"})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const allProducts = async function (req, res) {
    try {
        let { page, limit } = req.query;
        if (!page) page = 1;
        if (!limit) limit = 10;
        const skip = (page - 1) * 10;
        const products = await productModel.find().skip(skip).limit(limit).populate('category_id', 'categoryName');

        res.send({ page: page, limit: limit, productDetails: products })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = { CreateProduct, ProductById, UpdateProductById, DeleteProductById, allProducts };