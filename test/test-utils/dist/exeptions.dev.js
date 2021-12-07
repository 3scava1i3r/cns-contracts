"use strict";

function isException(error) {
  var strError = error.toString();
  return strError.includes("invalid opcode") || strError.includes("invalid JUMP") || strError.includes("revert");
}

function ensureException(error) {
  assert(isException(error), error.toString());
}

function expectFailure(call) {
  return regeneratorRuntime.async(function expectFailure$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(call);

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", ensureException(_context.t0));

        case 8:
          assert.fail("should fail");

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

module.exports = {
  ensureException: ensureException,
  expectFailure: expectFailure
};