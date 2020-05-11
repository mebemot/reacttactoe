import assert from "assert";
import { whosTurn } from "../Game";

describe("whosTurn", () => {
  describe("whosTurn( /* no args */ )", () => {
    test.todo("We should always check our params");
  });
  describe("whosTurn(0)", () => {
    it('Should return "X" when called with move number "0" as "X" goes first', () => {
      assert.equal(whosTurn(0), "X");
    });
  });
  describe("whosTurn - When called with odd or even move number", () => {
    it.each`
      numericValue | expected
      ${1}         | ${"O"}
      ${2}         | ${"X"}
      ${90909}     | ${"O"}
      ${80808}     | ${"X"}    
    `(
      'should return "$expected" when called with "$numericValue"',
      ({ numericValue, expected }) => {
        expect(whosTurn(numericValue)).toBe(expected);
      }
    );
  });
});
