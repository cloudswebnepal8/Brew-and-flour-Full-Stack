import axios from "axios";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("abc_user");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (error) {
      localStorage.removeItem("abc_user");
      console.error("Stored account session is invalid.", error);
    }
  }
  return config;
});

export default api;
