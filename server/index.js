require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conect");
const router = require("./routes/router");
const cors = require("cors");

const port = 8005;

app.use(cors());
app.use(express.json());
app.use(router);

app.use("/uploads", express.static("./uploads"));

app.listen(port, () => {
  console.log(`server started at port: ${port}`);
});
