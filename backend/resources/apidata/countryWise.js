const axios = require("axios");

const countrywise = () =>
  axios({
    method: "GET",
    url:
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "b1bfded860msh83ecaacd8202c1cp19d3e9jsn94528b68eea8",
    },
  });
module.exports = countrywise;
