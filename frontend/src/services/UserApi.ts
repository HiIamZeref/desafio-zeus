import { api } from "./Api.ts";
import { User } from "@/@types/types.ts";

export const userLogin = async function (user: User) {
  return await api.post("auth/loginUser", user);
};

export const getUserData = async function (_id: string) {
  return await api.get(`/user/${_id}`);
};
