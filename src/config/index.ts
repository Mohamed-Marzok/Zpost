import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: "https://tarmeezacademy.com/api/v1",
});
