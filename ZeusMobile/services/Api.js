import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.18.9.214:8080",
});

export const getGastosMesAtual = async function () {
  return await api.get("/gastosMesAtual");
};

export const getValoresDefault = async function () {
  return await api.get("/defaultValues");
};
