"use strict";

var hre = require("hardhat");

var namehash = require("eth-ens-namehash");

var tld = "";
var ethers = hre.ethers;
var utils = ethers.utils;

var labelhash = function labelhash(label) {
  return utils.keccak256(utils.toUtf8Bytes(label));
};

var ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
var ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";

function main() {
  var ENSRegistry, FIFSRegistrar, ReverseRegistrar, PublicResolver, signers, accounts, ens, resolver, registrar, reverseRegistrar;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ethers.getContractFactory("ENSRegistry"));

        case 2:
          ENSRegistry = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(ethers.getContractFactory("FIFSRegistrar"));

        case 5:
          FIFSRegistrar = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(ethers.getContractFactory("ReverseRegistrar"));

        case 8:
          ReverseRegistrar = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(ethers.getContractFactory("PublicResolver"));

        case 11:
          PublicResolver = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(ethers.getSigners());

        case 14:
          signers = _context.sent;
          accounts = signers.map(function (s) {
            return s.address;
          });
          _context.next = 18;
          return regeneratorRuntime.awrap(ENSRegistry.deploy());

        case 18:
          ens = _context.sent;
          _context.next = 21;
          return regeneratorRuntime.awrap(ens.deployed());

        case 21:
          _context.next = 23;
          return regeneratorRuntime.awrap(PublicResolver.deploy(ens.address, ZERO_ADDRESS));

        case 23:
          resolver = _context.sent;
          console.log("ens address = ".concat(ens.address));
          _context.next = 27;
          return regeneratorRuntime.awrap(resolver.deployed());

        case 27:
          _context.next = 29;
          return regeneratorRuntime.awrap(setupResolver(ens, resolver, accounts));

        case 29:
          _context.next = 31;
          return regeneratorRuntime.awrap(FIFSRegistrar.deploy(ens.address, namehash.hash(tld)));

        case 31:
          registrar = _context.sent;
          _context.next = 34;
          return regeneratorRuntime.awrap(registrar.deployed());

        case 34:
          console.log("registrar address = ".concat(registrar.address));
          _context.next = 37;
          return regeneratorRuntime.awrap(setupRegistrar(ens, registrar));

        case 37:
          _context.next = 39;
          return regeneratorRuntime.awrap(ReverseRegistrar.deploy(ens.address, resolver.address));

        case 39:
          reverseRegistrar = _context.sent;
          console.log("resolver address = ".concat(resolver.address));
          _context.next = 43;
          return regeneratorRuntime.awrap(reverseRegistrar.deployed());

        case 43:
          _context.next = 45;
          return regeneratorRuntime.awrap(setupReverseRegistrar(ens, registrar, reverseRegistrar, accounts));

        case 45:
          console.log("reverseRegistrar address = ".concat(reverseRegistrar.address));

        case 46:
        case "end":
          return _context.stop();
      }
    }
  });
}

function setupResolver(ens, resolver, accounts) {
  var resolverNode, resolverLabel;
  return regeneratorRuntime.async(function setupResolver$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          resolverNode = namehash.hash("resolver");
          resolverLabel = labelhash("resolver");
          _context2.next = 4;
          return regeneratorRuntime.awrap(ens.setSubnodeOwner(ZERO_HASH, resolverLabel, accounts[0]));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(ens.setResolver(resolverNode, resolver.address));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(resolver["setAddr(bytes32,address)"](resolverNode, resolver.address));

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function setupRegistrar(ens, registrar) {
  return regeneratorRuntime.async(function setupRegistrar$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(ens.setSubnodeOwner(ZERO_HASH, labelhash(tld), registrar.address));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function setupReverseRegistrar(ens, registrar, reverseRegistrar, accounts) {
  return regeneratorRuntime.async(function setupReverseRegistrar$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(ens.setSubnodeOwner(ZERO_HASH, labelhash("reverse"), accounts[0]));

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap(ens.setSubnodeOwner(namehash.hash("reverse"), labelhash("addr"), reverseRegistrar.address));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
} // We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.


main().then(function () {
  return process.exit(0);
})["catch"](function (error) {
  console.error(error);
  process.exit(1);
});