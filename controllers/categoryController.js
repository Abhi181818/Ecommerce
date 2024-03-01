import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name required!", success: false })
        }
        const exists = await categoryModel.findOne({ name })
        if (exists) {
            return res.status(200).send({ message: "Category exists", success: true })
        }
        const categoryNew = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({ success: true, message: "New Category created!", categoryNew })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Category error!!",
            error
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({ success: true, message: "Updated Category!!" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "cannot update category", error })
    }
}

export const categoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        res.status(200).send({ success: true, message: "All Category list", categories })
        // console.log(categories)
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Cannot get Categories" })
    }

}

export const singleCategoryController = async (req, res) => {

    try {
        const cat = await categoryModel.findOne(req.params)
        res.status(200).send({ success: true, message: "Got single category!", cat })

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: true, message: "Error while getting single category!" })
    }
}

export const deleteCategoryController = async (req, res) => {

    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({ success: true, message: "Deleted category!" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Cannot delete category!" })
    }
}