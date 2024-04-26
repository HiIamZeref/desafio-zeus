import { UserModel } from "../models/UserModel.js";

const getUserData = async function (req, res) {
  console.log("Buscando dados do usuário...");
  const { _id } = req.params;

  if (!_id) {
    console.log("Parametros faltando!");
    return res.status(418).send({
      status: "error",
      message: "Parametros faltando!",
    });
  }

  // Check if user exists

  const user = await UserModel.findById(_id, "-password");

  if (!user) {
    console.log("Usuário não encontrado!");
    return res.status(404).send({
      status: "error",
      message: "Usuário não encontrado!",
    });
  }

  res.status(200).send(user);
  console.log("Dados do usuário encontrados e enviados!");
};

export { getUserData };
