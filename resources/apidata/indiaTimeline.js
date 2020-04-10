const axios = require("axios");

const newFunction = () =>
  axios({
    method: "GET",
    url:
      "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india_timeline",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
      "x-rapidapi-key": "b1bfded860msh83ecaacd8202c1cp19d3e9jsn94528b68eea8",
    },
  });
module.exports = newFunction;
