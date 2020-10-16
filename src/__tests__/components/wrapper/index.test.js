import React from "react";
import { render } from "@testing-library/react";
import Wrapper from "../../../components/wrapper";

describe("Wrapper Component", () => {
  test("renders wrapper component with heading and children", () => {
    const { getByText } = render(
      <Wrapper heading="Home" children={<p>children</p>} />
    );
    const homeElement = getByText(/Home/i);
    expect(homeElement).toBeInTheDocument();
    const children = getByText(/children/i);
    expect(children).toBeInTheDocument();
  });
});
