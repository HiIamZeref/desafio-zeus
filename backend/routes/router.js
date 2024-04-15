import { Router } from "express";
import {
  getGastos,
  postGastos,
  deleteGastos,
  updateGastos,
  getGastosMesAtual,
  getGastosMesTotal,
} from "../controllers/gastosController.js";

const router = Router();

// Rotas gastos
router.get("/gastos", getGastos);
router.post("/gastos", postGastos);
router.delete("/gastos", deleteGastos);
router.patch("/gastos", updateGastos);

// Rotas valores default
// router.get("/defaultValues", getValoresDefault);
// router.patch("/defaultValues", updateValoresDefault);

// Rotas gastos mensais
router.get("/gastosMesAtual", getGastosMesAtual);
router.get("/gastosMesTotal", getGastosMesTotal);

export default router;
