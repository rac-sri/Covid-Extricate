// import web3 from "./web3";
const CampaignFactory = require("./build/contracts.json");

const interface = CampaignFactory["covidextricate.sol"].CovidExtricate.abi;
const bytecode =
  CampaignFactory["covidextricate.sol"].CovidExtricate.evm.bytecode.object;
console.log(bytecode);
// console.log(web3);
