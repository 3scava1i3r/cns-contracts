"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var namehash = require("eth-ens-namehash");

var sha3 = require("web3-utils").sha3;

var _require = require("./test-utils/exceptions"),
    exceptions = _require.exceptions;

var contracts = [[artifacts.require("./registry/ENSRegistry.sol"), "Solidity"]];
contracts.forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      ENS = _ref2[0],
      lang = _ref2[1];

  contract("ENS " + lang, function (accounts) {
    var ens;
    beforeEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(ENS["new"]());

            case 2:
              ens = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    it("should allow ownership transfers", function _callee2() {
      var addr, result, args;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              addr = "0x0000000000000000000000000000000000001234";
              _context2.next = 3;
              return regeneratorRuntime.awrap(ens.setOwner("0x0", addr, {
                from: accounts[0]
              }));

            case 3:
              result = _context2.sent;
              _context2.t0 = assert;
              _context2.next = 7;
              return regeneratorRuntime.awrap(ens.owner("0x0"));

            case 7:
              _context2.t1 = _context2.sent;
              _context2.t2 = addr;

              _context2.t0.equal.call(_context2.t0, _context2.t1, _context2.t2);

              assert.equal(result.logs.length, 1);
              args = result.logs[0].args;
              assert.equal(args.node, "0x0000000000000000000000000000000000000000000000000000000000000000");
              assert.equal(args.owner, addr);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
    it("should prohibit transfers by non-owners", function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(exceptions.expectFailure(ens.setOwner("0x1", "0x0000000000000000000000000000000000001234", {
                from: accounts[0]
              })));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it("should allow setting resolvers", function _callee4() {
      var addr, result, args;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              addr = "0x0000000000000000000000000000000000001234";
              _context4.next = 3;
              return regeneratorRuntime.awrap(ens.setResolver("0x0", addr, {
                from: accounts[0]
              }));

            case 3:
              result = _context4.sent;
              _context4.t0 = assert;
              _context4.next = 7;
              return regeneratorRuntime.awrap(ens.resolver("0x0"));

            case 7:
              _context4.t1 = _context4.sent;
              _context4.t2 = addr;

              _context4.t0.equal.call(_context4.t0, _context4.t1, _context4.t2);

              assert.equal(result.logs.length, 1);
              args = result.logs[0].args;
              assert.equal(args.node, "0x0000000000000000000000000000000000000000000000000000000000000000");
              assert.equal(args.resolver, addr);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
    it("should prevent setting resolvers by non-owners", function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(exceptions.expectFailure(ens.setResolver("0x1", "0x0000000000000000000000000000000000001234", {
                from: accounts[0]
              })));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
    it("should allow setting the TTL", function _callee6() {
      var result, args;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(ens.setTTL("0x0", 3600, {
                from: accounts[0]
              }));

            case 2:
              result = _context6.sent;
              _context6.t0 = assert;
              _context6.next = 6;
              return regeneratorRuntime.awrap(ens.ttl("0x0"));

            case 6:
              _context6.t1 = _context6.sent.toNumber();

              _context6.t0.equal.call(_context6.t0, _context6.t1, 3600);

              assert.equal(result.logs.length, 1);
              args = result.logs[0].args;
              assert.equal(args.node, "0x0000000000000000000000000000000000000000000000000000000000000000");
              assert.equal(args.ttl.toNumber(), 3600);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
    it("should prevent setting the TTL by non-owners", function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(exceptions.expectFailure(ens.setTTL("0x1", 3600, {
                from: accounts[0]
              })));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
    it("should allow the creation of subnodes", function _callee8() {
      var result, args;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(ens.setSubnodeOwner("0x0", sha3("eth"), accounts[1], {
                from: accounts[0]
              }));

            case 2:
              result = _context8.sent;
              _context8.t0 = assert;
              _context8.next = 6;
              return regeneratorRuntime.awrap(ens.owner(namehash.hash("eth")));

            case 6:
              _context8.t1 = _context8.sent;
              _context8.t2 = accounts[1];

              _context8.t0.equal.call(_context8.t0, _context8.t1, _context8.t2);

              assert.equal(result.logs.length, 1);
              args = result.logs[0].args;
              assert.equal(args.node, "0x0000000000000000000000000000000000000000000000000000000000000000");
              assert.equal(args.label, sha3("eth"));
              assert.equal(args.owner, accounts[1]);

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
    it("should prohibit subnode creation by non-owners", function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(exceptions.expectFailure(ens.setSubnodeOwner("0x0", sha3("eth"), accounts[1], {
                from: accounts[1]
              })));

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
  });
});