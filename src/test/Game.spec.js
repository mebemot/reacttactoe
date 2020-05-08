import assert from "assert";
import { whosTurn } from "../Game";

describe("whosTurn", () => {
    describe("whosTurn( /* no args */ )", () => {
        test.todo("We should always check our params");
    });
    describe("whosTurn(odd number)", () => {
        it('Should return "O" (oh) when called with "1"', () => {
            assert.equal(whosTurn(1), "O");
        });
        it('Should return "O" (oh) when called with "101"', () => {
            assert.equal(whosTurn(101), "O");
        });
    });
    describe("whosTurn(even number)", () => {
        it('Should return "X" (ex) when called with "2"', () => {
            assert.equal(whosTurn(2), "X");
        });
        it('Should return "X" (ex) when called with "202"', () => {
            assert.equal(whosTurn(202), "X");
        });
    });
    it('Should return "X" (ex) when called with "0"', () => {
        assert.equal(whosTurn(0), "X");
    });
});
