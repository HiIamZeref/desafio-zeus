import { mongoose } from "../database/db.js";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    name: String,
    email: String,
    password: String,
    //   isAdmin: Boolean,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("users", UserSchema);

export { UserModel };
