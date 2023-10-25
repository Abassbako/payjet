const { ObjectId } = require('mongodb');
const cartModel = require('../models/cartModel');

const createCarts = async (req, res) => {
    try {
        const cart = new cartModel(req.body);

        const saveCart = await cart.save();

        res.status(201).json(saveCart);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e)
    }
};

const findCart = async (req, res) => {
   if (ObjectId.isValid(req.params._id)) {
        const { UserId } = req.params
        try {
            const cart = await cartModel.findOne({ UserId });

            if (cart) return res.status(200).json(cart);

            else return res.status(404).json({ error: "This field is empty" });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        }
   } else return res.status(401).json({ error: "Invalid id" });
};

const getCarts = async (req, res) => {
    try {
        const carts = await cartModel.find();

        res.status(200).json(carts);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    }
};

const updateCart = async (req, res) => {
    if (ObjectId.isValid(req.params._id)) {
        const updates = req.body
        try {
            const update = await cartModel.findByIdAndUpdate(req.params._id, { $set: updates }, { new: true });

            if (update) return res.status(200).json({ successful: "Your cart has been successfully updated" });

            else return res.status(400).json({ error: "An error just occured while updating cart" });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(401).json({ error: "Invalid id" });
};

const deleteCart = async (req, res) => {
   if (ObjectId.isValid(req.params._id)) {
    try {
        const { _id } = req.params;

        const cart = await cartModel.findByIdAndDelete(_id);
    
        if (cart) return res.status(200).json({ successful: "Your cart has been successfully deleted" });
    
        else return res.status(401).json({ error: "A cart with this id does not exist" });
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e)
    }
   } else res.status(401).json({ error: "Invalid id" });
}

module.exports = { createCarts, findCart, getCarts, updateCart, deleteCart };