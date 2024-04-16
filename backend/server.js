// ES6 Modules
import router from "./routes/router.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Configuração do dotenv global
dotenv.config();

// Common JS
// const express = require("express");
// const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3030;

// App setup
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
