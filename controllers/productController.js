import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from 'fs'
import categoryModel from '../models/categoryModel.js';
import braintree from 'braintree';
import orderModel from '../models/orderModel.js';
import { config } from 'dotenv';

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
    try {
        const { name, slug, price, description, category, quantity } = req.fields;
        const { image } = req.files;

        if (!name || !price || !description || !category || !quantity || !image) {
            return res.status(400).send({ success: false, message: "All fields are required!" });
        }

        const newProduct = new productModel({ ...req.fields, slug: slugify(name) });
        if (image) {
            newProduct.image.data = fs.readFileSync(image.path)
            newProduct.image.contentType = image.type
        }
        await newProduct.save();
        res.status(201).send({ success: true, message: "Created product", newProduct });
    } catch (error) {
        res.status(500).send({ success: false, message: "Could not create product!" });
    }
};


export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-image").limit(12).sort({ createdAt: -1 });
        res.status(200).send({ success: true, totalProducts: products.length, products });
    } catch (error) {
        res.status(500).send({ success: false, message: "Could not get products!" });
    }
}

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-image").populate('category');
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found!" });
        }
        res.status(200).send({ success: true, product });
    } catch (error) {
        res.status(500).send({ success: false, message: "Could not get product!" });
    }
}


export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params.pid });
        if (!product || !product.image.data) {
            return res.status(404).send({ success: false, message: "Product not found!" });
        }
        res.set('Content-Type', product.image.contentType);
        res.status(200).send(product.image.data);
    } catch (error) {
        res.status(500).send({ success: false, message: "Could not get product photo!" });
    }
}


export const deleteProductController = async (req, res) => {

    try {
        const product = await productModel.findOneAndDelete({ _id: req.params.pid }).select("-image");
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found!" });
        }
        res.status(200).send({ success: true, message: "Product deleted!" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Could not delete product!" });
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, price, description, category, quantity } = req.fields;
        const { image } = req.files;

        if (!name || !price || !description || !category || !quantity) {
            return res.status(400).send({ success: false, message: "All fields are required!" });
        }

        const product = await productModel.findOne({ _id: req.params.pid });
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found!" });
        }

        product.name = name;
        product.slug = slugify(name);
        product.price = price;
        product.description = description;
        product.category = category;
        product.quantity = quantity;
        if (image) {
            product.image.data = fs.readFileSync(image.path)
            product.image.contentType = image.type
        }
        await product.save();
        res.status(200).send({ success: true, message: "Product updated!", product });
    } catch (error) {
        res.status(500).send({ success: false, message: "Could not update product!" });
    }
}

export const productFilterController = async (req, res) => {
    try {
        const { category, price } = req.query;

        let query = {}
        if (category) {
            query = { category: { $in: category.split(',') } }
        }
        if (price) {
            let prices = price.split(',').map(p => parseInt(p))
            query = { price: { $gte: prices[0], $lte: prices[1] } }
        }
        if (category && price) {
            let prices = price.split(',').map(p => parseInt(p))
            query = { category: { $in: category.split(',') }, price: { $gte: prices[0], $lte: prices[1] } }
        }

        const products = await productModel.find(query).select("-image");
        res.status(200).send({ success: true, totalProducts: products.length, products });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Could not filter products!" });
    }
}

export const productCountController = async (req, res) => {
    try {
        const totalProducts = await productModel.find({}).estimatedDocumentCount();
        // return totalProducts
        res.status(200).send({ success: true, totalProducts });
    } catch (error) {
        console.log(error)
    }
}

export const productListController = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const perPage = 4;
        const products = await productModel.find({}).skip((page - 1) * perPage).limit(perPage).select("-image").sort({ createdAt: -1 });
        res.status(200).send({ success: true, totalProducts: products.length, products });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Could not get products!" });
    }
}

export const productSearchController = async (req, res) => {

    try {
        const products = await productModel.find({
            $or: [
                { name: { $regex: req.params.keyword, $options: 'i' } },
                { description: { $regex: req.params.keyword, $options: 'i' } }
            ]
        }).select("-image");
        res.status(200).send({ success: true, totalProducts: products.length, products });
    } catch (error) {
        res.status(500).send({ success: false, message: "Could not search products!" });
    }
}

export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).send({ success: false, message: "Category not found!" });
        }
        const products = await productModel.find({ category }).populate('category').select("-image");

        res.status(200).send({ success: true, category, products });
    } catch (error) {
        res.status(500).send({ success: false, message: "Could not get products!" });
    }
}

export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, (err, response) => {
            if (err) {
                return res.status(500).send({ success: false, message: "Could not generate token!" });
            }
            res.status(200).send({ success: true, token: response.clientToken });
        });

    } catch (error) {
        console.log(error)
    }
}

export const braintreePaymentController = (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map(c => {
            total += c.price
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }
            , (err, result) => {
                if (err) {
                    return res.status(500).send({ success: false, message: "Could not process payment!" });
                }
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user?.id
                })
                order.save()
            });
        res.status(200).send({ success: true, message: "Payment successful" });
    } catch (error) {
        console.log(error)
    }
}