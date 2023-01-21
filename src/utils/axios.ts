import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  timeout: 4000,
  params: {
    client_id: import.meta.env.VITE_ACCESS_KEY,
  },
});

export default instance;
