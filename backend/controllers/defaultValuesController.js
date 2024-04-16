import { defaultValuesModel } from "../models/defaultValuesModel.js";

const getDefaultValues = async function (req, res) {
  console.log("Getting default values...");
  try {
    const defaultValues = await defaultValuesModel.find();
    res.status(200).send(defaultValues);
    console.log("Default values gotten and sent!");
  } catch (error) {
    console.log("Error getting default values");
    console.log(error);
    res.status(500).send({ status: "error", message: error });
  }
};

const updateDefaultValues = async function (req, res) {
  console.log("Updatig default values...");
  const { newQuantidadeDefault, newDinheiroDefault } = req.body;
  if (!newQuantidadeDefault || !newDinheiroDefault) {
    res.status(418).send({
      status: "error",
      message: "Parametros faltando!",
    });
  }

  try {
    const defaultValues = await defaultValuesModel.find();
    defaultValues[0].quantidadeDefault = newQuantidadeDefault;
    defaultValues[0].dinheiroDefault = newDinheiroDefault;
    await defaultValues[0].save();
    res.status(200).send(defaultValues);
    console.log("Default values updated!");
  } catch (error) {
    console.log("Error updating default values");
    console.log(error);
    res.status(500).send({ status: "error", message: error });
  }
};

export { getDefaultValues, updateDefaultValues };
