import web3 from "./web3";
const CampaignFactory = require("./build/contracts.json");

console.log(CampaignFactory["donationcamp.sol"]);
const abi = CampaignFactory["donationcamp.sol"].DonationCamp.abi;
const instance = (address) => new web3.eth.Contract(abi, address);

export default instance;
