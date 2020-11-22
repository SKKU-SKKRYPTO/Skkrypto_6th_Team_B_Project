import axios from "axios";

const api = axios.create({
  baseURL:"http://localhost:8080",
  withCredentials: true
});

const Api = {
  getServerTime: () => api.get("api/hello")
}

export default Api;