import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  timeout: 5000,
  validateStatus: (status) => status === 200,
  params: {
    client_id: import.meta.env.VITE_ACCESS_KEY,
  },
});

export default instance;
