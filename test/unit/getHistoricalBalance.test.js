"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getHistoricalBalances_1 = require("../../src/services/getHistoricalBalances");
describe("getHistoricalBalance", () => {
    it("should return the boilerplate object", () => {
        const res = (0, getHistoricalBalances_1.getHistoricalBalance)();
        expect(res).toEqual({ hello: "world" });
    });
});
