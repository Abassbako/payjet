const orderModel = require('../models/orderModel');
const { ObjectId } = require('mongodb');

const newOrder = async (req, res) => {
    try {
        const order = new orderModel(req.body);

        const saveOrder = await order.save();

        res.status(201).json(saveOrder);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e)
    }
};

const findOrder = async (req, res) => {
    if (ObjectId.isValid(req.params.UserId)) {
        try {
            const { UserId } = req.params;
    
            const order = await orderModel.findOne({ UserId });
    
            if (order) return res.status(200).json(order);
    
            else return res.status(500).json({ error: 'A user with this id does not exist' });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(401).json({ error: "Invalid id" });
};

const updateOrder = async (req, res) => {
   if (ObjectId.isValid(req.params.UserId)) {
    const updates = req.body
    try {
        const { UserId } = req.params;

        const update = await orderModel.findByIdAndUpdate(UserId, 
            {
                $set: updates
            },
            {
                new: true
            }
        );

        if (update) return res.status(200).json({ successful: "Your order has been succesfully updated" });

        else return res.status(500).json({ error: "An order with this id does not exist" })
    } catch (e) {
        console.error(new Error(e));
        res.status(200).json(e)
    };
   } else return res.status(500).json({ error: "Invalid id" });
};

const getOrders = async (req, res) => {
    try {
        const order = await orderModel.find();

        res.status(200).json(order);

    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const deleteOrder = async (req, res) => {
   if (ObjectId.isValid(req.params._id)) {
    try {
       const { _id } = req.params;

       const order = await orderModel.findByIdAndDelete(_id);

       if (order) return res.status(200).json({ successful: "Your order has been successfully deleted" });

       else return res.status(500).json({ error: "An order with this id does not exist" });
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
   } else return res.status(401).json({ error: "Invalid id" });
};

module.exports = { newOrder, findOrder, updateOrder, getOrders, deleteOrder }