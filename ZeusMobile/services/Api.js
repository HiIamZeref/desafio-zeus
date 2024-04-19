import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.18.9.214:8080",
});

// Rotas Gastos
export const getGastosMesAtual = async function () {
  return await api.get("/gastosMesAtual");
};

export const postGasto = async function (gasto) {
  return await api.post("/gastos", gasto);
};

export const getGastosMesTotal = async function () {
  return await api.get("/gastosMesTotal");
};

// Rotas DefaultValues
export const getDefaultValues = async function () {
  return await api.get("/defaultValues");
};

export const patchDefaultValues = async function (defaultValues) {
  return await api.patch("/defaultValues", defaultValues);
};
