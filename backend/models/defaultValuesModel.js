import { mongoose } from "../database/db.js";

const DefaultValuesSchema = new mongoose.Schema(
  {
    quantidadeDefault: Number,
    dinheiroDefault: Number,
  },
  { versionKey: false }
);

// Por algum motivo, colocar o nome da table com PascalCase não funciona
const defaultValuesModel = mongoose.model("defaultvalues", DefaultValuesSchema);

export { defaultValuesModel };
