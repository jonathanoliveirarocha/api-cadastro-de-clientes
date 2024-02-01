const customerService = require("../services/customer.service");
const verifyCpf = require("../helpers/verifyCpf");

const customerController = {
  createCustomer: async (req, res) => {
    const { name, cpf, birthdate } = req.body;

    try {
      const regexDate = /^\d{4}-\d{2}-\d{2}$/;
      const currentDate = new Date();

      if (!name || !cpf || !birthdate) {
        return res.status(400).json({ message: "Request missing data or they are empty!" });
      } else if (!verifyCpf(cpf)) {
        return res.status(422).json({ message: "Invalid CPF!" });
      } else if (!regexDate.test(birthdate)) {
        return res.status(400).json({ message: "Invalid date!" });
      } else if (new Date(birthdate)>currentDate) {
        return res.status(422).json({ message: "Invalid birthdate. It cannot be in the future." });
      } 

      const customer = await customerService.findOneByCpf(verifyCpf(cpf));

      if (customer) {
        return res.status(409).json({ mensage: "CPF already registered!" });
      } 

      await customerService.createCustomer({
        name,
        cpf: verifyCpf(cpf),
        birthdate: new Date(birthdate),
      });

      return res.status(200).json({ message: "Customer successfully registered!" });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal error occurred when register customer!" });
    }
  },

  getCostumerByCpf: async (req, res) => {
    const { cpf } = req.body;

    try {
      if (!verifyCpf(cpf)) {
        return res.status(422).json({ message: "Invalid CPF!" });
      } 

      const customer = await customerService.findOneByCpf(verifyCpf(cpf));

      if (!customer) {
        return res.status(404).json({ message: "Customer not yet registered!" });
      }

      return res.json(customer);
     
     
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal error occurred when querying CPF!" });
    }
  },

  getAllCostumersInRange: async (req, res) => {
    const start = parseInt(req.query.start) | 0;
    const end = parseInt(req.query.end) | 9;

    try {
      const customers = await customerService.findAllInRange(start, end);

      return res.json(customers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "An internal error occurred when looking for customers!"});
    }
  },
};

module.exports = customerController;
