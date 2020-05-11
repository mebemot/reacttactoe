import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Status } from "../Status";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Status winner: {Winning player||''}, nextPlayer: {Next player}, isDraw:{Boolean}", () => {
  describe("Renders Winner when not empty", () => {
    test.each`
      params                                                                      | expected
      ${{ winner: "Winning player", nextPlayer: "Next player", isDraw: "false" }} | ${"Winner: Winning player"}
      ${{ winner: "Winning player", nextPlayer: "Next player", isDraw: "true" }}  | ${"Winner: Winning player"}
    `("when '$params' should return '$expected'", ({ params, expected }) => {
      act(() => {
        render(<Status {...params} />, container);
      });
      expect(container.textContent).toMatch("Winner: Winning player");
    });
  });

  it("renders as draw", () => {
    act(() => {
      render(
        <Status winner={null} nextPlayer={"Next player"} isDraw={true} />,
        container
      );
    });
    expect(container.textContent).toMatch("Draw:(");
  });

  it("renders with next player", () => {
    act(() => {
      render(
        <Status winner={null} nextPlayer={"Next player"} isDraw={false} />,
        container
      );
    });
    expect(container.textContent).toMatch("Next player: Next player");
  });
});
