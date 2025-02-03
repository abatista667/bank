const express = require("express");
var cors = require("cors");
const app = express();
const PORT = 3002;

app.use(cors());

let acountCollection = [
  {
    ownerId: "1111",
    alias: "Dollar1",
    currency: "USD",
    balance: "1111111",
  },
  {
    ownerId: "2222",
    alias: "Euro",
    currency: "EUR",
    balance: "2222",
  },
  {
    ownerId: "1112",
    alias: "Dollar2",
    currency: "USD",
    balance: "2222",
  },
  {
    ownerId: "2223",
    alias: "Euro2",
    currency: "EUR",
    balance: "2222",
  },
];
let transactionCollection = [];

const currencies = ["USD", "EUR", "GBP"];

const rates = new Map([
  [JSON.stringify({ from: "USD", to: "EUR" }), 0.9],
  [JSON.stringify({ from: "EUR", to: "USD" }), 1.1],
  [JSON.stringify({ from: "USD", to: "GBP" }), 0.8],
  [JSON.stringify({ from: "GBP", to: "USD" }), 1.2],
  [JSON.stringify({ from: "EUR", to: "GBP" }), 0.86],
  [JSON.stringify({ from: "GBP", to: "EUR" }), 1.17],
]);

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("up and running");
});

app.get("/api/currencies", (req, res) => {
  res.json(currencies);
});
app.get("/changeRate/:from/:to", (req, res) => {
  const key = JSON.stringify({ from: req.params.from, to: req.params.to });
  const rate = rates.get(
    JSON.stringify({ from: req.params.from, to: req.params.to }),
  );

  res.json(rate ?? 1);
});
app.get("/api/account", (req, res) => {
  res.json(acountCollection);
});
app.get("/api/transaction", (req, res) => {
  res.json(transactionCollection);
});
app.post("/api/account", (req, res) => {
  const account = req.body;
  const edit = acountCollection.find(
    (item) => item.ownerId === account.ownerId,
  );
  if (edit) {
    edit.balance = account.balance;
    edit.alias = account.alias;
    edit.currency = account.currency;
    res.send("account updated");
    return;
  }
  acountCollection.push(account);
  res.send("account added");
});
app.post("/api/transaction", (req, res) => {
  const transaction = req.body;
  transactionCollection.push(transaction);
  res.send("transaction added");
});
app.delete("/api/account/:id", (req, res) => {
  const ownerId = req.params.id;
  acountCollection = acountCollection.filter(
    (item) => item.ownerId !== ownerId,
  );
  res.send("account added");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
