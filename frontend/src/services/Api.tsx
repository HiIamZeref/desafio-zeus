import axios from "axios";

interface Gastos {
  data: string;
  quantidade: number;
  dinheiro: number;
}

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getGastos = async function () {
  return await api
    .get("/gastos")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Erro ao buscar gastos: ${error}`);
    });
};

export const postGastos = async function (gastos: Gastos) {
  console.log("Gastos recebidos:" + gastos);
  return await api
    .post("/gastos", gastos)
    .then((response) => {
      console.log("Gastos postados");
      console.log(response.data);
      // return response.data;
    })
    .catch((error) => {
      throw new Error(`Erro ao postar gastos: ${error}`);
    });
};
