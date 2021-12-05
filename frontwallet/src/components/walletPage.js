import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import WalletDataService from "../service/wallet.service";
import './walletPage.css'; // Tell webpack that Button.js uses these styles

const WalletPage = () => {
    const [wallets, setWallet] = useState([]);
    const [addInputs, setAddInputs] = useState(false);
    const [subInputs, setSubInputs] = useState(false);
    const [amount, setAmount] = useState(1);
    const [description, setDescription] = useState('');
    const [totalAmount, setTotalAmount] = useState();

    useEffect(() => {
        getWallet();
        getCurrectBalance();
    }, []);

    const getWallet = async () => {
        WalletDataService.getAll()
            .then(response => {
                setWallet(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const getCurrectBalance = async () => {
        WalletDataService.getCurrectBalance()
            .then(response => {
                setTotalAmount(response.data[1]);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const saveAddTransaction = (e) => {
        e.preventDefault();
        if (Number(amount) < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You cant enter negative amount!',
            })
            return;
        }
        const data = {
            amount: amount,
            description: description
        };

        WalletDataService.create(data)
            .then(response => {
                setAmount(response.data.amount);
                setDescription(response.data.description);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const saveSubTransaction = (e) => {
        e.preventDefault();
        if (-Math.abs(amount) + totalAmount < 0 || Number(amount) < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You cant have negative balance in your wallet!',
            })
            return;
        }
        const data = {
            amount: -Math.abs(amount),
            description: description
        };

        WalletDataService.create(data)
            .then(response => {
                setAmount(response.data.amount);
                setDescription(response.data.description);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <button onClick={() => setAddInputs(addInputs ? false : true)} className="button is-primary mt-2">
                Add amount to the wallet balance
            </button>
            <button onClick={() => setSubInputs(subInputs ? false : true)} className="button is-primary mt-2">
                Subtract amount from wallet
            </button>

            <div>
                <form onSubmit={saveAddTransaction}>
                    {addInputs ?
                        <div>
                            <h3>Add Transaction</h3>
                            <div className="field">
                                <label className="label">Amount</label>
                                <input
                                    className="input"
                                    type="number"
                                    min="1"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Description</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <button className="button is-primary">Save this transaction</button>
                            </div>
                        </div>
                        : ''}
                </form>


                <form onSubmit={saveSubTransaction}>
                    {subInputs ?
                        <div>
                            <h3>Sub Transaction</h3>
                            <div className="field">
                                <label className="label">Amount</label>
                                <input
                                    className="input"
                                    type="number"
                                    min="0"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Description</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <button className="button is-primary">Save this transaction</button>
                            </div>
                        </div>
                        : ''}
                </form>
            </div>

            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No:</th>
                        <th>Amount:</th>
                        <th>Description:</th>
                        <th>Create At:</th>
                    </tr>
                </thead>
                <tbody>
                    {wallets.map((wallet, index) => (
                        <tr key={wallet.id}>
                            <td>{index + 1}</td>
                            <td>{wallet.amount}</td>
                            <td>{wallet.description}</td>
                            <td>{wallet.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="field">
                <label className="customLabel">Total wallet amount:  </label>
                <span class="amountStyle">{totalAmount}</span>
            </div>
        </div>
    );
};

export default WalletPage;
