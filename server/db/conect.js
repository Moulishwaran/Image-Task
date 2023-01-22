const mongoose = require("mongoose");

const MongoDB =
  "mongodb+srv://moulish:admin@cluster0.xr3ryos.mongodb.net/ImgUpload?retryWrites=true&w=majority";

mongoose
  .connect(MongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DataBase connected"))
  .catch((err) => console.log("error" + err.message));
