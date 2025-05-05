import { render, screen } from "@testing-library/react";
import Spinner from "./index";

describe("Spinner", () => {
  it("should render with default props", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner).toHaveClass("loading_spinner");
    expect(spinner).toHaveClass("gray");
    expect(spinner).toHaveClass("md");
  });

  it("should apply the correct variant class", () => {
    render(<Spinner variant="green" />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("green");
  });

  it("should apply the correct size class", () => {
    render(<Spinner size="lg" />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("lg");
  });

  it("should apply both variant and size classes correctly", () => {
    render(<Spinner variant="blue" size="sm" />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("blue");
    expect(spinner).toHaveClass("sm");
  });
});
