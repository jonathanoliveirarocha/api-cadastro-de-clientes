const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  birthdate: { type: Date, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
