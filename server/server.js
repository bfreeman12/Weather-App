const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config({ path: "../.env" });

app.use(express.json());

const weatherApiKey = process.env.OPENWEATHER_API;
const server_ip = process.env.SERVER_IP;
const server_port = process.env.SERVER_PORT;
const client_port = process.env.CLIENT_PORT;

app.use(
  cors({
    origin: `http://${server_ip}:${client_port}`,
  })
);

app.listen(server_port, () => {
  console.log(`Server is running on port: ${server_port}`);
});

app.post("/api/fetch-weather", async (req, res) => {
  try {
    const { queryInput } = req.body;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${queryInput}&appid=${weatherApiKey}&units=imperial`
    );
    return res.json({
      message: "success",
      data: response.data,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //NEED TWO DIFFERENT FUNCTIONS HERE BASED ON IF THE SEARCH IS A ZIP CODE OR NOT
  // https://api.openweathermap.org/data/2.5/weather?zip={zip_code},{country_code}&appid={weatherApiKey}
});
