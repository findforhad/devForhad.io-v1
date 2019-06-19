const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Middleware
app.use(express.json());
app.use(require("cors")());
app.use(express.static("uploads"));
app.use("/api/v1", require("./routes/portfolio"));
app.use("/api/v1", require("./routes/contactsubs"));

app.get("/", (req, res) => {
  res.send(process.mainModule.filename + "index.html");
});

//Database Connection
mongoose
  .connect(require("./config/keys").mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Database Establashed"))
  .catch(err => console.log(err));

//Server Connection
const port = process.env.PORT || 2020;
app.listen(port, () => console.log("Server is up"));
