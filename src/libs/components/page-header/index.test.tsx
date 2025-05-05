import { render, screen } from "@testing-library/react";
import PageTitle from "./index";

describe("PageTitle", () => {
  it("renders correctly with title and subtitle", () => {
    render(<PageTitle title="Page Title" subtitle="This is a subtitle" />);
    expect(screen.getByTestId("page-title")).toHaveTextContent("Page Title");
    expect(screen.getByTestId("page-subtitle")).toHaveTextContent(
      "This is a subtitle"
    );
    expect(screen.getByTestId("divider")).toBeInTheDocument();
  });

  it("renders correctly with only title", () => {
    render(<PageTitle title="Page Title" />);

    expect(screen.getByTestId("page-title")).toHaveTextContent("Page Title");
    expect(screen.queryByTestId("page-subtitle")).not.toBeInTheDocument();
    expect(screen.getByTestId("divider")).toBeInTheDocument();
  });
});
