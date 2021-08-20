"use strict";
exports.__esModule = true;
exports.GlobalPay = void 0;
var axios_1 = require("axios");
var sha256_1 = require("sha256");
var PaySystems;
(function (PaySystems) {
    PaySystems[PaySystems["Qiwi"] = 1] = "Qiwi";
})(PaySystems || (PaySystems = {}));
;
axios_1["default"].interceptors.response.use(function (_a) {
    var data = _a.data;
    return data;
}, function (err) { var _a, _b; return Promise.reject(((_b = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors) || err); });
axios_1["default"].defaults.baseURL = "https://globalpay.bz/api/v1/";
var GlobalPay = /** @class */ (function () {
    function GlobalPay(api_key) {
        this.api_key = null;
        this.api_key = api_key;
        axios_1["default"].defaults.data = {
            api_key: api_key
        };
        axios_1["default"].defaults.params = {
            api_key: api_key
        };
    }
    GlobalPay.prototype.createPayment = function (amount, email, pay_system) {
        if (pay_system === void 0) { pay_system = PaySystems.Qiwi; }
        return axios_1["default"].post("payments/create", {
            amount: amount,
            email: email,
            pay_system: pay_system
        });
    };
    GlobalPay.prototype.getPayment = function (token) {
        return axios_1["default"].get("payments/get", {
            params: {
                token: token
            }
        });
    };
    GlobalPay.prototype.createPayout = function (amount, wallet, pay_system) {
        if (pay_system === void 0) { pay_system = PaySystems.Qiwi; }
        return axios_1["default"].post("payouts/create", {
            amount: amount,
            wallet: wallet,
            pay_system: pay_system
        });
    };
    GlobalPay.prototype.getPayout = function (token) {
        return axios_1["default"].get("payouts/get", {
            params: {
                token: token
            }
        });
    };
    GlobalPay.prototype.getProjectBalance = function () {
        return axios_1["default"].get("project/balance");
    };
    GlobalPay.prototype.compareSign = function (sign, token, amount) {
        var compareSign = sha256_1["default"](String(token) + String(amount) + String(this.api_key)).toString().toUpperCase();
        return compareSign == sign;
    };
    return GlobalPay;
}());
exports.GlobalPay = GlobalPay;
