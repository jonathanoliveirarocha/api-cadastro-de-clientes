const express = require("express");
const app = express();
const cors = require("cors");
const customer = require("./src/routes/customer");
require("./src/config/db");

const PORT = process.env.PORT | 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/customer", customer);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
