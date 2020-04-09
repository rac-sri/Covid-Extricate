const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campPath = path.resolve(__dirname, "contracts", "covidextricate.sol");
const source = fs.readFileSync(campPath, "utf8");
const campPath2 = path.resolve(__dirname, "contracts", "donationcamp.sol");
const source2 = fs.readFileSync(campPath2, "utf8");
const output = JSON.parse(
  solc.compile(
    JSON.stringify({
      language: "Solidity",
      sources: {
        "donationcamp.sol": {
          content: source2,
        },
        "covidextricate.sol": {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    })
  )
);

// for (var contractName in output.contracts["covidextricate.sol"]) {
//   console.log(
//     contractName +
//       ": " +
//       output.contracts["covidextricate.sol"]["CovidExtricate"].evm.bytecode
//         .object
//   );
// }
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
