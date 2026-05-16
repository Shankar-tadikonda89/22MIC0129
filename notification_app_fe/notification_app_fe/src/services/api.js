import axios from "axios";

const API = axios.create({
  baseURL: "http://4.224.186.213/evaluation-service"
});

export default API;