import React from "react";
import { render, screen } from "@testing-library/react";
import Homepage from "../../../components/homepage";

describe("Homepage Component", () => {
  test("renders homepage component", () => {
    render(<Homepage repositories={[]} />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
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
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/maintainer/i)).toBeInTheDocument();
    expect(screen.getByText(/created/i)).toBeInTheDocument();
    expect(screen.getByText(/url/i)).toBeInTheDocument();
  });
});
