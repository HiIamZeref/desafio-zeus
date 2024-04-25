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
import { loginUser, registerUser } from "../controllers/UserController.js";

const router = Router();

// Rotas usuários
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
