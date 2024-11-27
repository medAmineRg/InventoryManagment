import { CLOUD_API_URL, LOCAL_API_URL, API_TOKEN } from "@env";
import axios from "axios";

axios.defaults.baseURL = LOCAL_API_URL;
// add authorization header to the axios instance
axios.defaults.headers.common["Authorization"] = API_TOKEN;

// fetch products from the API http://localhost:3000/product/basic
const fetchProducts = async () => {
  try {
    const response = await axios.get("product/basic-info");
    return response.data;
  } catch (error) {
    return error;
  }
};

// post request to this api http://localhost:3000/stock/set-product-count
const postProducts = async (countData) => {
  try {
    const response = await axios.post("/stock/set-product-count", countData);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export { fetchProducts, postProducts };
