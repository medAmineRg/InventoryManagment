import axios from "axios";

const signup = async ({ email, password }) => {
  const response = await axios.post(
    "http://localhost:8082/v1/authentication/signup",
    {
      username: email,
      password: password,
    }
  );
  return response.data;
};

const signin = async ({ email, password }) => {
  const response = await axios.post(
    "http://localhost:8082/v1/authentication/signin",
    {
      username: email,
      password: password,
    }
  );
  return response.data;
};

export { signup, signin };
