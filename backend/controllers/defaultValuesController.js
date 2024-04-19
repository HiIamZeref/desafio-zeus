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

const patchDefaultValues = async function (req, res) {
  console.log("Updating default values...");
  const { newQuantidadeDefault, newDinheiroDefault, newMetaGastoMensal } =
    req.body;
  if (!newQuantidadeDefault || !newDinheiroDefault || !newMetaGastoMensal) {
    console.log("Parametros faltando!");
    return res.status(418).send({
      status: "error",
      message: "Parametros faltando!",
    });
  }
  console.log(newQuantidadeDefault, newDinheiroDefault, newMetaGastoMensal);
  try {
    const response = await defaultValuesModel.findOneAndUpdate(
      {},
      {
        quantidadeDefault: newQuantidadeDefault,
        dinheiroDefault: newDinheiroDefault,
        metaGastoMensal: newMetaGastoMensal,
      }
    );
    console.log("Default values updated!");
    const updatedDefaultValues = await defaultValuesModel.find();

    res.status(200).send(updatedDefaultValues);
  } catch (error) {
    console.log("Error updating default values");
    console.log(error);
    res.status(500).send({ status: "error", message: error });
  }
};

export { getDefaultValues, patchDefaultValues as updateDefaultValues };
