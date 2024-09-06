require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.NEXT_PUBLIC_MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB", err));
