import React from "react";
import { render } from "@testing-library/react";
import Homepage from "../../../components/homepage";

describe("Homepage Component", () => {
  test("renders homepage component", () => {
    const { getByText } = render(<Homepage repositories={[]} />);
    const homeElement = getByText(/Home/i);
    expect(homeElement).toBeInTheDocument();
  });

  test("renders homepage component with empty repositories", () => {
    render(<Homepage repositories={[]} />);
  });

  test("renders homepage component with repositories", () => {
    render(
      <Homepage
        repositories={[
          {
            Name: "name",
            Maintainer: "maintainer",
            URL: "url",
            Created: "created",
          },
        ]}
      />
    );
  });
});
