const customerService = require("../services/customer.service");
const verifyCpf = require("../helpers/verifyCpf");

const customerController = {
  createCustomer: async (req, res) => {},

  getCostumerByCpf: async (req, res) => {
    const { cpf } = req.body;

    try {
      if (!verifyCpf(cpf)) {
        res.status(400).json({ mensagem: "Invalid CPF!" });
      } else {
        
        const customer = await customerService.findOneByCpf(verifyCpf(cpf));

        if (!customer) {
          res.status(404).json({ mensagem: "Customer not yet registered!" });
        } else {
          res.json(customer);
        }
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An internal error occurred when querying CPF!" });
    }
  },

  getAllCostumersInRange: async (req, res) => {
    const start = parseInt(req.query.start) | 0;
    const end = parseInt(req.query.end) | 10;

    try {
      const customers = await customerService.findAllInRange(start, end);

      res.json(customers);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An internal error occurred when looking for customers!",
      });
    }
  },
};

module.exports = customerController;
