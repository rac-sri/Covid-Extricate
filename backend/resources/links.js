const axios = require("axios");
const indiaTimeline = require("./apidata/indiaTimeline");
const world = require("./apidata/worldTotalStat");
const countryWise = require("./apidata/countryWise");
const countryTimeline = require("./apidata/countryTimeline");
require("dotenv").config();

async function geturl(url, value) {
  switch (url) {
    case "indiaTimeline":
      const result = await indiaTimeline();
      return result.data;
    case "world":
      const result2 = await world();
      return result2.data;
    case "countryWise":
      const result3 = await countryWise();
      return result3.data.countries_stat;
    case "historyCountry":
      const result4 = await countryTimeline(value);
      console.log(result4.data);
      return result4.data.stat_by_country;
  }
}

module.exports = geturl;
