import axios from "axios";

const weatherFetch = async (queryInput) => {
  try {
    const response = await axios.post(
      "http://10.0.0.248:8432/api/fetch-weather",
      {
        queryInput,
      }
    );
    const data = response.data;
    return data.data;
  } catch (error) {
    alert("Error please try again");
    console.error("Error fetching weather", error);
  }
};
export default weatherFetch;
