import axios from "axios";
import { User } from "@/@types/types";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const api = axios.create({
  baseURL: "http://172.18.9.214:8080",
});

export const userLogin = async function (user: User) {
  return await api.post("auth/loginUser", user);
};

export const getUserData = async function (_id: string) {
  return await api.get(`/user/${_id}`);
};
