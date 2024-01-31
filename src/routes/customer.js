const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/create", customerController.createCustomer);
router.get("/findonebycpf", customerController.getCostumerByCpf);
router.get("/findall", customerController.getAllCostumer);

module.exports = router;
