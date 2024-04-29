import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.18.9.214:8080",
});
