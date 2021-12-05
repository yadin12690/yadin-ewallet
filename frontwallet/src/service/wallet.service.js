import http from "../http-common";

class WalletDataService {
    getAll() {
        return http.get("/wallets/history");
    }

    getCurrectBalance() {
        return http.get("/wallets/balance");
    }

    create(data) {
        return http.post("/wallets", data);
    }

}

export default new WalletDataService();