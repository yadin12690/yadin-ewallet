module.exports = app => {
    const wallets = require("../controllers/wallet.controller.js");

    const router = require("express").Router();

    // Create a new Wallet
    router.post("/", wallets.create);

    // Retrieve all wallets
    router.get("/history", wallets.findAll);

    // Retrieve a current balance with a timestamp of last operation
    router.get("/balance", wallets.getCurrentBalance);

    // Update a Tutorial with id
    router.put("/:id", wallets.update);

    app.use('/api/wallets', router);
};