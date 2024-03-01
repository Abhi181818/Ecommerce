import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, updateCategoryController, deleteCategoryController, singleCategoryController, createCategoryController } from "../controllers/categoryController.js";
const router = express()

router.post("/create-category", requireSignIn, isAdmin, createCategoryController)

router.put("/update-category/:id", requireSignIn, updateCategoryController)

router.get("/get-categories", categoryController)

router.get("/single-category/:slug", singleCategoryController)

router.delete('/delete-category/:id', deleteCategoryController)

export default router