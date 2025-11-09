import axios from "axios";

const api = axios.create({
  baseURL: "https://skilllink-app.onrender.com/api", // your Render backend URL
});

export default api;

