const Customer = require("../models/Customer");

const customerService = {
  createCustomer: async (customer) => {},

  findOneByCpf: async (cpf) => {
    const customer = await Customer.findOne({ cpf: cpf });
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
