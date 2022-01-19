const { formatEther, parseEther } = require("@ethersproject/units");

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  let name = "USDT FAKE";
  let symbol = "USDT";
  let decimals = "6";
  let total = 1000000000000;
  let ownerBalance = 1000000000000;
  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("SafeDogTestToken");
  const greeter = await Greeter.deploy(name, symbol, decimals, total, total);

  await greeter.deployed();
  console.log("Token deployed to:", greeter.address);
  await delay(15000);

  try {
    await hre.run("verify:verify", {
      address: greeter.address,
      constructorArguments: [name, symbol, decimals, total, total],
    });
  } catch (e) {
    console.log(e);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
