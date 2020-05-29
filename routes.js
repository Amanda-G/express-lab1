const express = require("express");

const cart = express.Router();

const cartEndpointURI = "/cart";

let cartItems = [
    {
        id: 1,
        product: "jar of pickles",
        price: "$1.99",
        quantity: 5
    },
    {
        id: 2,
        product: "pack of socks",
        price: "$5.99",
        quantity: 1
    },
    {
        id: 3,
        product: "ice cream",
        price: "$4.49",
        quantity: 2
    },
    {
        id: 4,
        product: "hot cheetos",
        price: "$2.99",
        quantity: 1
    }
]

let nextId = cartItems.length + 1;

//1. GET /cart
cart.get(cartEndpointURI, (req, res) => {
    res.json(cartItems);
})


//2. GET /cart/:id
cart.get(`${cartEndpointURI}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const cartItem = cartItems.find((item) => item.id === id)
    if (cartItem) {
        res.status(200)
        res.json(cartItem)
    } else {
        res.status(404)
        res.send("ID Not Found")
    }
})


//3. POST /cart
cart.post(cartEndpointURI, (req, res) => {
    let newCartItem = req.body;
    newCartItem.id = nextId;
    nextId++;
    cartItems.push(newCartItem);
    res.status(201);
    res.json(newCartItem);
})


//4. PUT /cart/:id
cart.put(`${cartEndpointURI}/:id`, (req, res) => {
    let id = parseInt(req.params.id);
    let updatedItem = req.body;
    updatedItem.id = id;
    let foundIndex = cartItems.findIndex((item) => item.id === id);
    if (foundIndex > -1) {
        cartItems.splice(foundIndex, 1, updatedItem);
        res.status(200);
        res.json(updatedItem);
    } else {
        res.status(404);
        res.send(`nothing at this id`);
    }
})


//5. DELETE /cart/:id
cart.delete(`${cartEndpointURI}/:id`, (req, res) => {
    let id = parseInt(req.params.id);
    let foundIndex = cartItems.findIndex((item) => item.id === id);
    if (foundIndex > -1) {
        cartItems.splice(foundIndex, 1);
        res.status(204);
        res.json(cartItems);
    } else {
        res.status(404);
        res.send(`nothing at this id`);
    }
})



module.exports = {
    cart
}