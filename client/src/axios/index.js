import axios from "axios";

const api = axios.create({
   baseURL: "https://jsonplaceholder.typicode.com//",
   timeout: 1000,
   headers: {
       'Content-type': 'application/json; charset=UTF-8',
   },
});

// Alter defaults after instance has been created
api.defaults.headers.common["Authorization"] = `AUTH_TOKEN`;
export default api;