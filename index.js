require("dotenv").config();
// const { ethers } = require("ethers"); // works
const ethers = require("ethers"); // works also

// let keys = Object.keys(ethers);
// keys.sort();
// keys.forEach((k) => console.log(k));

const randomBytes = ethers.utils.randomBytes(16); // object- Unsigned Integer 8 bit array of 16 numbers
// console.log(randomBytes); // Ex. => [ 114, 99, 231, 179, 225, 250, 140, 44, 89, 26, 65, 250, 73, 12, 52, 133 ]

// create a random mnemonic to use as the seed for the HDNode
const mnemonic = ethers.utils.entropyToMnemonic(randomBytes); // string- 12 words separated by spaces

// create HD (Hierarchical Deterministic) node (has root private/public key, address)
// - this object helps us generate multiple accounts from one seed phrase
// - can generate an infinite number of accounts/wallets from one seed phrase
// - deterministic = same inputs (HD address path & seed phrase) will result in deterministic output (account)
// - https://github.com/bethanyuo/HD-wallet
const node = ethers.utils.HDNode.fromMnemonic(process.env.mnemonic);
// console.log("node", node); //=>
// HDNode {
//   privateKey: '', // deleted, but this the root private key
//   publicKey: '0x028a81f1775502b8feb6b4cf64dff69c1bc20bafa9a1f0a4c8d353a5a50f5dec1a',
//   parentFingerprint: '0x00000000',
//   fingerprint: '0x827bb54d',
//   address: '0x388a7958c295e5BB8a3dD77D66590c23c1958315',
//   chainCode: '0x9da7c99e9e8ac00c218f61ea0725b60985c4440379351992b9ef5d84e97c288d',
//   index: 0, // HD index
//   depth: 0,
//   mnemonic: {
//     phrase: '',  // deleted, but this is the root seed phrase
//     path: 'm',
//     locale: 'en'
//   },
//   path: 'm'
// }

// HD Path
// - m’ / purpose’ / coin_type’ / account’ / change / address_index
// - specifies the type of account we want to generate (ex. ethereum, vs bitcoin)
// - ex coin_type = 0 is bitcoin, coin_type = 60 is ethereum
// - incrementing the HD Index changes the account
// - https://medium.com/myetherwallet/hd-wallets-and-derivation-paths-explained-865a643c7bf2
// - https://ethereum.stackexchange.com/questions/70017/can-someone-explain-the-meaning-of-derivation-path-in-wallet-in-plain-english-s
// const addressPath = `m/44'/60'/0'/0/${HDindex}`;

const wallets = [];

// create 5 accounts
for (let HDindex = 0; HDindex < 5; HDindex++) {
  // incrementing the HDindex on each loop creates a new account
  const addressPath = `m/44'/60'/0'/0/${HDindex}`;

  // create new HD Node (which is a child of HD node)
  // - each account has different public/private key, but same seed phrase
  const newAccount = node.derivePath(addressPath);
  console.log(newAccount);
  wallets.push(newAccount.address);
  console.log("------------------------------");
}

console.log(wallets);
// [
//   '0xcdf383CC5BfC58Ecf4fC68f047565e4322892C2F',
//   '0x284d2a468984D66F5994A9D9d667A32f7A41fda7',
//   '0x0FEB45C8309D551698C61564000D9F3aB5ABD0F4',
//   '0x08a3e3c2C0Cc35E46CD0371b8BA200c9EbC7C254',
//   '0xd2A4De4A4D4D36462870e1a76e73776C2E894486'
// ]
