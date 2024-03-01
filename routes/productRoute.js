import express from 'express'
import { createProductController, getProductController, getSingleProductController, productFilterController, productPhotoController, deleteProductController, updateProductController, productCountController, productListController, productSearchController, productCategoryController, braintreeTokenController, braintreePaymentController } from '../controllers/productController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
const router = express.Router()

router.post('/create-product', formidable(), createProductController)

router.get('/get-product', getProductController)

router.get('/get-product/:slug', getSingleProductController)

router.get('/product-photo/:pid', productPhotoController)

router.delete('/delete-product/:pid', deleteProductController)

router.put('/update-product/:pid', formidable(), updateProductController)

router.post('/product-filter', productFilterController)

router.get('/product-count', productCountController)

router.get('/product-list/:page', productListController)

router.get('/search/:keyword', productSearchController)

router.get('/product-category/:slug', productCategoryController)

router.get('/braintree/token', braintreeTokenController)

router.post('/braintree/payment',  braintreePaymentController)

export default router