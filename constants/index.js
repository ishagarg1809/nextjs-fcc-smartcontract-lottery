// we're gonna use this file to import all the constants
// and then export them so we only have to import this one file
// everywhere else

const contractAddresses = require("./contractAddresses.json")
const abi = require("./abi.json")

module.exports = {
    abi,
    contractAddresses,
}
