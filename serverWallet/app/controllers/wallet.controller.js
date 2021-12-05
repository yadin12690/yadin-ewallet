const db = require("../models/index.js");
const Wallet = db.wallets;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const wallet = {
        amount: req.body.amount,
        description: req.body.description,
    };

    // Save Tutorial in the database
    Wallet.create(wallet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const amount = req.query.amount;
    var condition = amount ? {
        amount: {
            [Op.like]: amount
        }
    } : null;

    Wallet.findAll({
        where: condition
    })
        .then(data => {
            res.send(data); // Return all data and current wallet balance
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Get the current wallet balance
exports.getCurrentBalance = (req, res) => {
    Wallet.findAll()
        .then(data => {
            sumOfCurrentBalance = data.reduce((totalAmount, wallet) => totalAmount + wallet.amount, 0);
            res.send(["total:", sumOfCurrentBalance]);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving wallet."
            });
        });
};

// Update a Wallet by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Wallet.update(req.body, {
        where: {
            id: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Wallet was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Wallet with id=${id}. Maybe Wallet was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Wallet with id=" + id
            });
        });
};