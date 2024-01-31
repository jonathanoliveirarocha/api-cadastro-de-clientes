const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/create", customerController.createCustomer);
router.post("/findonebycpf", customerController.getCostumerByCpf);
router.post("/findallinrange", customerController.getAllCostumersInRange);

module.exports = router;
