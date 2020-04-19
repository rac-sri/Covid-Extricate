import web3 from "./web3";

const abi = require("./build/covidCatchABI.json");
const address = "0x8531C910912E8C6B6c500CE2bA7AE985aA545427";

const instance = new web3.eth.Contract(
  abi,
  address
);

export default instance;