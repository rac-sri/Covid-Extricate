import web3 from "./web3";
const CampaignFactory = require("./build/contracts.json");

const abi = CampaignFactory["covidextricate.sol"].CovidExtricate.abi;

const instance = new web3.eth.Contract(
  abi,
  "0x1A81559d69B63E0E17bd037932998663Cd759027"
);

export default instance;
