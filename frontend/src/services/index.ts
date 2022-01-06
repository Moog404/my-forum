import axios, { AxiosInstance } from "axios";
import store from "../store";

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API || 'http://localhost:3000'
})

export default api