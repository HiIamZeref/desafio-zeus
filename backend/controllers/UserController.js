import { UserModel } from "../models/UserModel.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const loginUser = async function (req, res) {
  //User Login
  console.log("Logando usuário...");
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Parametros faltando!");
    return res.status(418).send({
      status: "error",
      message: "Parametros faltando!",
    });
  }

  // Check if user exists
  const user = await UserModel.findOne({ email });

  if (!user) {
    console.log("Usuário não encontrado!");
    return res.status(404).send({
      status: "error",
      message: "Usuário não encontrado!",
    });
  }

  // Check if password is correct
  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) {
    console.log("Senha incorreta!");
    return res.status(401).send({
      status: "error",
      message: "Senha incorreta!",
    });
  }

  // Create JWT token and send it
  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ email, _id: user._id }, secret, {
      expiresIn: "1h",
    });

    console.log("Usuário logado com sucesso!");
    res.status(200).send({ token });
  } catch (error) {
    console.log("Erro ao criar token!");
    console.log(error);
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

const registerUser = async function (req, res) {
  // User Register
  console.log("Criando usuário...");
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    console.log("Parametros faltando!");
    return res.status(418).send({
      status: "error",
      message: "Parametros faltando!",
    });
  }

  // Check if user already exists
  const userExits = await UserModel.findOne({ email });
  if (userExits) {
    console.log("Usuário já existe!");
    return res.status(409).send({
      status: "error",
      message: "Usuário já existe!",
    });
  }

  // Hash the password
  const passwordHash = bcrypt.hashSync(password, 10);

  // Create user
  try {
    const userObject = new UserModel({
      _id: new ObjectId(),
      email,
      name,
      password: passwordHash,
    });
    await userObject.save();
    res.status(201).send(userObject);
    console.log("Usuário criado com sucesso!");
  } catch (error) {
    console.log("Erro ao criar usuário!");
    console.log(error);
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

export { loginUser, registerUser };
