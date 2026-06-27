import axios from "axios";

const API = "http://localhost:5000";

export async function getRecommendation(prompt) {
  const response = await axios.post(`${API}/recommend`, {
    prompt,
  });

  return response.data;
}