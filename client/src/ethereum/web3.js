import Web3 from "web3";

let web3;

if (typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/3dc8b2e3489c4260904f45a4e74a56dc"
  );
  web3 = new Web3(provider);
}

export default web3;
