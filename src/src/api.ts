import axios from "axios";
const API_URL = "https://dev.wildberries.ru/openapi/wb-tariffs";

export async function fetchWBTariffs(apiKey: string) {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}