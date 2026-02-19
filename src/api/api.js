import axios from "axios";

const API = axios.create({
    baseURL: "https://task-manager-api-66ti.onrender.com/api"
});

export default API;
