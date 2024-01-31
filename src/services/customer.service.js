const Customer = require("../models/Customer");

const customerService = {
  createCustomer: async (customer) => {},

  findOneByCpf: async (cpf) => {},

  findAllInRange: async (start, end) => {
    const customers = await Customer.find()
      .skip(start)
      .limit(end - start);

    return customers;
  },
};

module.exports = customerService;
