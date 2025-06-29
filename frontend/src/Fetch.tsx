import axios from "axios";
export const Fetch = axios.create({
  baseURL: "https://bot-fvvc.onrender.com/api/",
  // baseURL: "http://localhost:4000/api/",
});
