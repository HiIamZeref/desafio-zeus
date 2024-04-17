import { mongoose } from "../database/db.js";

const GastosSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    data: String,
    quantidade: Number,
    dinheiro: Number,
  },
  { versionKey: false }
);

const gastosModel = mongoose.model("dados", GastosSchema);

export { gastosModel };
// Path: models/gastoModel.js
