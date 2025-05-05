import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button", () => {
  it("should render the button with children", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Click Me");
  });

  it("should display the spinner when isLoading is true", () => {
    render(<Button isLoading={true}>Click Me</Button>);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("should apply the correct class for the colorScheme prop", () => {
    render(<Button colorScheme="green">Click Me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("green");
  });

  it("should be disabled when isLoading or disabled prop is true", () => {
    render(<Button isLoading={true}>Click Me</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    render(<Button disabled={true}>Click Me</Button>);

    expect(button).toBeDisabled();
  });

  it("should not be disabled when isLoading and disabled props are false", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });

  it("should handle click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
