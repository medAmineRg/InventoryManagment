import { LOCAL_API_URL, CLOUD_API_URL } from "@env";
import axios from "axios";

axios.defaults.baseURL = CLOUD_API_URL;

const signup = async ({ email, password }) => {
  const response = await axios.post(`/signup`, {
    email: email,
    password: password,
  });
  return response.data;
};

const signin = async ({ email, password }) => {
  const response = await axios.post(`/signin`, {
    email: email,
    password: password,
  });
  return response.data;
};

export { signup, signin };
