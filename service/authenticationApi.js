import { LOCAL_API_URL, CLOUD_API_URL } from "@env";
import axiosConf from "./axiosConf";

const signup = async ({ email, password }) => {
  const response = await axiosConf.post(`/signup`, {
    email: email,
    password: password,
  });
  return response.data;
};

const signin = async ({ email, password }) => {
  const response = await axiosConf.post(`/signin`, {
    email: email,
    password: password,
  });
  return response.data;
};

export { signup, signin };
