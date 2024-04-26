import { Router } from "express";
import {
  getGastos,
  postGastos,
  deleteGastos,
  updateGastos,
  getGastosMesAtual,
  getGastosMesTotal,
} from "../controllers/gastosController.js";
import {
  getDefaultValues,
  updateDefaultValues,
} from "../controllers/defaultValuesController.js";
import { loginUser, registerUser } from "../controllers/AuthController.js";
import { getUserData } from "../controllers/UserController.js";
import { checkUserToken } from "../middlewares/auth.js";

const router = Router();

// Rotas usuário
router.get("/user/:_id", checkUserToken, getUserData);

// Rotas autenticação
router.post("/auth/loginUser", loginUser);
router.post("/auth/registerUser", registerUser);

// Rotas gastos
router.get("/gastos", getGastos);
router.post("/gastos", postGastos);
router.delete("/gastos", deleteGastos);
router.patch("/gastos", updateGastos);

// Rotas valores default
router.get("/defaultValues", getDefaultValues);
router.patch("/defaultValues", updateDefaultValues);

// Rotas gastos mensais
router.get("/gastosMesAtual", getGastosMesAtual);
router.get("/gastosMesTotal", getGastosMesTotal);

export default router;
