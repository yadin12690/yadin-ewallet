module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("wallet", {
        amount: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
    });

    return Wallet;
};