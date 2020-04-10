import web3 from "./web3";
const CampaignFactory = require("./build/contracts.json");

const abi = CampaignFactory["donationcamp.sol"].DonationCamp.abi;
const instance = (address) => new web3.eth.Contract(abi, address);

export default instance;
