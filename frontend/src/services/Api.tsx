import axios from "axios";

interface Gastos {
  _id: string;
  data: string;
  quantidade: number;
  dinheiro: number;
}
interface NewGastos {
  data: string;
  quantidade: number;
  dinheiro: number;
}

const api = axios.create({
  baseURL: "http://localhost:8080",
});

//Rotas Gastos
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

export const postGastos = async function (gastos: NewGastos) {
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

export const deleteGastos = async function (id) {
  console.log(id, "id");
  return await api
    .delete("/gastos", { data: { _id: id } })
    .then((response) => {
      console.log("Gastos deletados");
      console.log(response.data);
    })
    .catch((error) => {
      throw new Error(`Erro ao deletar gastos: ${error}`);
    });
};

export const patchGastos = async function (gastos) {
  return await api
    .patch("/gastos", gastos)
    .then((response) => {
      console.log("Gastos atualizados");
      console.log(response.data);
    })
    .catch((error) => {
      throw new Error(`Erro ao atualizar gastos: ${error}`);
    });
};

//Rotas Gastos Agregados
export const getGastosMesAtual = async function () {
  return await api
    .get("/gastosMesAtual")
    .then((response) => {
      console.log("Gastos mes atual recebidos");
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Erro ao buscar gastos: ${error}`);
    });
};

export const getGastosMesTotal = async function () {
  return await api
    .get("/gastosMesTotal")
    .then((response) => {
      console.log("Gastos mes total recebidos");
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Erro ao buscar gastos: ${error}`);
    });
};

//Rotas DefaultValues
export const getDefaultValues = async function () {
  return await api
    .get("/defaultValues")
    .then((response) => {
      console.log("Dados default recebidos");
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Erro ao buscar dados default: ${error}`);
    });
};

export const patchDefaultValues = async function (newDefaultValues) {
  return await api
    .patch("/defaultValues", newDefaultValues)
    .then((response) => {
      console.log("Dados default postados");
      console.log(response.data);
    })
    .catch((error) => {
      throw new Error(`Erro ao postar dados default: ${error}`);
    });
};
