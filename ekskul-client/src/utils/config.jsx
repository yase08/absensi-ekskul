import axios from "axios";
import { API, VERSION } from "./baseUrl";

export default axios.create({
  baseURL: `${API}/${VERSION}`,
});

export const axiosPrivate = axios.create({
  baseURL: `${API}/${VERSION}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
