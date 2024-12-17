import axios from "axios";
import { CLOUD_API_URL, LOCAL_API_URL } from "@env";

const axiosConf = axios.create();

axiosConf.defaults.baseURL = LOCAL_API_URL;

export default axiosConf;
