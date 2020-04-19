import web3 from "./web3";

const abi = require("./build/covidCatchABI.json");
const address = "0xC191bA990Edb1fB52E9b3Bc1B97F38A2349e76d5";

const instance = new web3.eth.Contract(
  abi,
  address
);

export default instance;