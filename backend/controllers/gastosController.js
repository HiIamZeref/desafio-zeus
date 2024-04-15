import { gastosModel } from "../models/gastosModel.js";
import { calcGastoAtual, calcGastoMensalTotal } from "../services/utils.js";

const getGastos = async function (req, res) {
  console.log("Getting gastos");
  try {
    const allGastos = await gastosModel.find();
    res.status(200).send(allGastos);
    console.log("Gastos gotten and sent!");
  } catch (error) {
    console.log("Error getting gastos");
    console.log(error);
    res.status(500).send({ status: "error", message: error });
  }
};
const postGastos = async function (req, res) {
  console.log("Posting gastos");
  const { data, quantidade, dinheiro } = req.body;
  if (!data || !quantidade || !dinheiro) {
    res.status(418).send({
      status: "error",
      message: "Parametros faltando!",
    });
  }

  try {
    const gastosObject = new gastosModel({ data, quantidade, dinheiro });
    await gastosObject.save();
    res.status(201).send(gastosObject);
    console.log("Gasto inserido com sucesso!");
  } catch (err) {
    console.log("Erro ao inserir gasto!");
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};
const deleteGastos = async function (req, res) {
  console.log("Deleting gastos entry...");
  const { _id } = req.body;

  if (!_id) {
    res.status(418).send({
      status: "error",
      message: "Preciso de um id para deletar!",
    });
  }

  try {
    const data = await gastosModel.deleteOne({ _id });
    [data.status, data.message] = ["OK", "Dado deletado com sucesso!"];

    console.log("Gasto deletado com sucesso!");
    res.status(200).send(data);
  } catch (error) {
    console.log("Erro ao deletar gasto!");
    console.log(error);
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};
const updateGastos = async function (req, res) {
  console.log("Updating gastos entry...");
  const { _id, newData, newQuantidade, newDinheiro } = req.body;

  if (!_id || !newData || !newQuantidade || !newDinheiro) {
    res.status(418).send({
      status: "error",
      message: "Parametros faltando!",
    });
  }
  try {
    const data = await gastosModel.updateOne(
      { _id },
      { data: newData, quantidade: newQuantidade, dinheiro: newDinheiro }
    );
    [data.status, data.message] = ["OK", "Dado atualizado com sucesso!"];
    console.log("Gasto atualizado com sucesso!");
    res.status(200).send(data);
  } catch (error) {
    console.log("Erro ao atualizar gasto!");
    console.log(error);
    res.status(500).send({
      status: "error",
      message: error,
    });
  }
};

const getGastosMesAtual = async function (req, res) {
  console.log("Getting gastos mes atual");

  try {
    const allGastos = await gastosModel.find();
    const gastoAtual = calcGastoAtual(allGastos);

    console.log("Gastos mes atual gotten and sent!");
    res.status(200).send({ gastoMensalAtual: gastoAtual });
  } catch (error) {
    console.log("Error getting gastos mes atual");
    console.log(error);
    res.status(500).send({ status: "error", message: error });
  }
};

const getGastosMesTotal = async function (req, res) {
  console.log("Getting gastos mes total");

  try {
    const allGastos = await gastosModel.find();
    const gastoTotal = calcGastoMensalTotal(allGastos);

    console.log("Gastos mes total gotten and sent!");
    res.status(200).send(gastoTotal);
  } catch (error) {
    console.log("Error getting gastos mes total");
    console.log(error);
    res.status(500).send({ status: "error", message: error });
  }
};
export {
  getGastos,
  postGastos,
  deleteGastos,
  updateGastos,
  getGastosMesAtual,
  getGastosMesTotal,
};
