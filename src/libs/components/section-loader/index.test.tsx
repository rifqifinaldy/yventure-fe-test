import { render, screen } from "@testing-library/react";
import PageLoader from "./index";

describe("PageLoader", () => {
  it("should render with default title", () => {
    render(<PageLoader />);

    expect(screen.getByText("Loading ...")).toBeInTheDocument();
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("lg");
    expect(spinner).toHaveClass("blue");
  });

  it("should render with a custom title", () => {
    const customTitle = "Please wait...";
    render(<PageLoader title={customTitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("lg");
    expect(spinner).toHaveClass("blue");
  });

  it("should render the spinner correctly", () => {
    render(<PageLoader />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("loading_spinner");
    expect(spinner).toHaveClass("lg");
    expect(spinner).toHaveClass("blue");
  });
});
