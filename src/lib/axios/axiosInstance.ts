import axios, { AxiosInstance } from "axios";

export const axiosInstance = (): { instance:AxiosInstance } => {
  const instance = axios.create({
     baseURL: "http://localhost:8080/",
  });
  return { instance };
};
