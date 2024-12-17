import axios from "axios";
import { CLOUD_API_URL } from "@env";

const axiosConf = axios.create();

axiosConf.defaults.baseURL = CLOUD_API_URL;

export default axiosConf;
