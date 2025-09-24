import axios from "axios";

const productionURL = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionURL,
});
