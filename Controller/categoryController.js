const mongoose = require('mongoose');
const categoryModel = require('../Model/categoryModel');


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

const CreateCategory = async function (req, res) {
    try {
        const data = req.body;

        const { categoryName } = data;

        if (!isValid(categoryName)) {
            return res.status(404).send({ status: false, message: "Category is required..!!" })
        };

        const newCategory = await categoryModel.create(data)
        res.status(201).send({ status: true, data: newCategory });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const CategoryById = async function (req, res) {

    try {
        const categoryId = req.params.id;

        if (!isValidObjectId(categoryId)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        const category = await categoryModel.findById({ _id: categoryId })
        if (!category) { return res.status(404).send({ status: false, message: "No data found" }) }

        res.status(200).send({ status: true, data: category })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
}

const UpdateCategoryById = async function (req, res) {
    try {
        let data = req.body;
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        const update = await categoryModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })

        if (!update) return res.status(400).send({ status: false, message: "category is Deleted" })

        res.status(201).send({ status: true, message: "Success", data: update })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const DeleteCategoryById = async function (req, res) {
    try {
        const  categoryId  = req.params.id

        const category = await categoryModel.findById(categoryId)
        if (!category) {
            return res.status(404).send({ status: false, message: "Category not found..!!" })
        }
        if (category.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Category is already deleted..!!" })
        }

        let delCategory = await categoryModel.remove({ _id: categoryId })

        res.status(200).send({ status: true, message: "category deleted sucessfully" })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { CreateCategory, CategoryById, UpdateCategoryById,DeleteCategoryById };