import axios from "axios";

interface Dados {
  data: string;
  quantidade: number;
  dinheiro: number;
}

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getDados = async function () {
  return await api
    .get("/dados")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Erro ao buscar dados: ${error}`);
    });
};

// export const getDados = async function () {
//   return await api.get("/dados").then((response) => {
//     return response.data;
//   });
// };

export const postDados = async function (dados: Dados) {
  return await api
    .post("/dados", dados)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`Erro ao postar dados: ${error}`);
    });
};
