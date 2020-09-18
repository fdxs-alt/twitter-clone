import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/",
});

export default instance;
