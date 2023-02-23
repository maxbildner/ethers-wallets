require("dotenv").config();
const { ethers } = require("ethers");

// let keys = Object.keys(ethers);
// keys.sort();
// keys.forEach((k) => console.log(k));

const randomBytes = ethers.utils.randomBytes(16); // object- array of 16 numbers
// console.log(randomBytes, typeof randomBytes);

// Create a random mnemonic to use as the seed for the HDNode
// const mnemonic = ethers.utils.entropyToMnemonic(randomBytes); // string- 12 words separated by spaces
console.log(process.env.mnemonic);
