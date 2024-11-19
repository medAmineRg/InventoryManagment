import { CLOUD_API_URL } from "@env";
import axios from "axios";

axios.defaults.baseURL = CLOUD_API_URL;

export { signup, signin };
