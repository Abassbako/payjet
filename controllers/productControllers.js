const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const createProduct = async (req, res) => {
    try {
      const product = new productModel(req.body);

      const saveProduct = await product.save();

      res.status(201).json(saveProduct);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    }
};

const findProducts = async (req, res) => {
    if (ObjectId.isValid(req.params.ProductId)) {
        try {
            const { ProductId } = req.params;
    
            const product = await productModel.findById(ProductId);
    
            res.status(200).json(product);
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(500).json({ error: "Invalid id" })
};

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();

        res.status(200).json(products);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const updateProduct = async (req, res) => {
   if (ObjectId.isValid(req.params.ProductId)) {
        const { ProductId } = req.params;
        try {
            const updates = req.body
            const update = await productModel.findByIdAndUpdate(ProductId, { $set: updates}, { new: true });

            if (update) return res.status(200).json({ successful: 'This product has been updated successfully' });

            else return res.status(500).json({ error: 'A product with this id does not exist' });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        }
   } else return res.status(401).json({ error: "Invalid id" });
};

const deleteProduct = async (req, res) => {
   if (ObjectId.isValid(req.params.ProductId)) {
        const { ProductId } = req.params;
        try {
            const product = await productModel.findByIdAndDelete(ProductId);

            if (product) return res.status(200).json({ successful: 'Your product has been deleted successfully' });

            else return res.status(500).json({ error: 'An error just occured while deleting this product'}); 
        }  catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        }
    } else return res.status(401).json({ error: "Invalid id" });
}

module.exports = { createProduct, findProducts, getProducts, updateProduct, deleteProduct }