import { mongoose } from "../database/db.js";

const GastosModel = new mongoose.Schema(
  {
    data: String,
    quantidade: Number,
    dinheiro: Number,
  },
  { versionKey: false }
);

const gastosModel = mongoose.model("dados", GastosModel);

export { gastosModel };
// Path: models/gastoModel.js
