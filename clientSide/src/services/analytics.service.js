import axios from "axios";


const analyticsAPI = axios.create({
  baseURL: "http://localhost:4000/api/analytics",
  withCredentials: true,
});


export const getAnalytics = async () => {
  try {
    const { data } = await analyticsAPI.get("/");

    return data;
  } catch (error) {
    console.error("Analytics API Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Unable to fetch analytics.",
      }
    );
  }
};