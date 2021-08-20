import axios from "axios"
import sha256 from "sha256"

enum PaySystems { Qiwi = 1 };

axios.interceptors.response.use(
    ({ data }) => data,
    (err) => Promise.reject(err?.response?.data?.errors || err)
);
axios.defaults.baseURL = "https://globalpay.bz/api/v1/";

class GlobalPay {
    api_key: string = null

    constructor(api_key: string) {
        this.api_key = api_key;
        axios.defaults.data = {
            api_key,
        };
        axios.defaults.params = {
            api_key,
        };
    }

    createPayment(amount: number, email: string, pay_system: PaySystems = PaySystems.Qiwi) {
        return axios.post("payments/create", {
            amount,
            email,
            pay_system,
        });
    }

    getPayment(token: string) {
        return axios.get("payments/get", {
            params: {
                token,
            },
        });
    }

    createPayout(amount: number, wallet: string, pay_system: PaySystems = PaySystems.Qiwi) {
        return axios.post("payouts/create", {
            amount,
            wallet,
            pay_system,
        });
    }

    getPayout(token: string) {
        return axios.get("payouts/get", {
            params: {
                token,
            },
        });
    }

    getProjectBalance() {
        return axios.get("project/balance");
    }

    compareSign(sign: string, token: string, amount: string | number) {
        const compareSign = sha256(
            String(token) + String(amount) + String(this.api_key)
        ).toString().toUpperCase();

        return compareSign == sign;
    }
}

export { GlobalPay };
