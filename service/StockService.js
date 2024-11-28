import { CLOUD_API_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an axios instance
const axiosConf = axios.create({
  baseURL: CLOUD_API_URL,
});

// Function to set the authorization header
const setAuthorizationHeader = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      axiosConf.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error setting authorization header:", error);
  }
};

// Call the function to set the authorization header
setAuthorizationHeader();

// Fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await axiosConf.get("/product/basic-info");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.response?.data?.message || "Error fetching products");
  }
};

// Post request to set product count
const setUpStock = async (countData) => {
  try {
    const response = await axiosConf.post(
      "/stock/set-product-count",
      countData
    );
    return response.data;
  } catch (error) {
    console.error("Error setting up stock:", error);
    throw new Error(error.response?.data?.message || "Error setting up stock");
  }
};

export { fetchProducts, setUpStock };
