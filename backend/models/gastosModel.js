import { mongoose } from "../database/db.js";

const GastosSchema = new mongoose.Schema(
  {
    data: String,
    quantidade: Number,
    dinheiro: Number,
  },
  { versionKey: false }
);

const gastosModel = mongoose.model("dados", GastosSchema);

export { gastosModel };
// Path: models/gastoModel.js
