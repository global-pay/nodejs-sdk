### Готовое решение для использования [GlobalPay.bz](https://globalpay.bz "GlobalPay.bz") API
##### [GlobalPay.bz](https://globalpay.bz "GlobalPay.bz") &mdash; универсальное платежное решение для вашего проекта

------------

[Документация к API](https://globalpay.bz/apiDoc "Документация к API")

------------

`npm i globalpay`

```javascript
const { GlobalPay } = require("globalpay"),
	  globalPay = new GlobalPay("api_key")

// Создание платежа
globalPay.createPayment(100, "test@globalpay.bz", 1).then(console.log).catch(console.error)

// Получение информации о платеже
globalPay.getPayment("token").then(console.log).catch(console.error)

// Создание выплаты
globalPay.createPayout(100, "79001112233", 1).then(console.log).catch(console.error)

// Получение информации о выплате
globalPay.getPayout("token").then(console.log).catch(console.error)

// Получение баланса проекта
globalPay.getProjectBalance().then(console.log).catch(console.error)

// Проверка запроса
globalPay.compareSign("sign", "token", "amount"); // true || false
```

