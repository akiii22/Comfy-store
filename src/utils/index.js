import axios from "axios";

const productionURL = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionURL,
});

export const formatPrice = (price) => {
  const philippineAmount = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format((price / 100).toFixed(2));
  return philippineAmount;
};
