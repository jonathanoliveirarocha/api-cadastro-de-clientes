const Customer = require("../models/Customer");

const customerService = {
  createCustomer: async (customer) => {
    const newCustomer = new Customer(customer);
    await newCustomer.save();
  },

  findOneByCpf: async (cpf) => {
    const customer = await Customer.findOne({ cpf });
    return customer;
  },

  findAllInRange: async (start, end) => {
    const customers = await Customer.find()
      .skip(start)
      .limit(end - start);

    return customers;
  },
};

module.exports = customerService;
