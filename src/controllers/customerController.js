const customerService = require("../services/customer.service");

const customerController = {
  createCustomer: async (req, res) => {},

  getCostumerByCpf: async (req, res) => {},

  getAllCostumersInRange: async (req, res) => {
    const start = parseInt(req.query.start) | 0;
    const end = parseInt(req.query.end) | 10;

    try {
      const customers = await customerService.findAllInRange(start, end);

      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: "Error when looking for clients!" });
    }
  },
};

module.exports = customerController;
