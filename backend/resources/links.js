const axios = require("axios");
const indiaTimeline = require("./apidata/indiaTimeline");
const world = require("./apidata/worldTotalStat");

require("dotenv").config();

async function geturl(url) {
  switch (url) {
    case "indiaTimeline":
      const result = await indiaTimeline();
      return result.data;
    case "world":
      const result2 = await world();
      console.log(result2.data);
      return result2.data;
    // .then((response) => {
    //   return response;
    // })
    // .catch((error) => {
    //   return error;
    // });
  }
}

module.exports = geturl;
