import { render, screen } from "@testing-library/react";
import EmptyState from "./index";

describe("EmptyState", () => {
  it("renders correctly with title and subtitle", () => {
    render(<EmptyState title="No Items" subtitle="Your list is empty" />);

    // Check if the title is rendered correctly
    expect(screen.getByText(/No Items/i)).toBeInTheDocument();

    // Check if the subtitle is rendered correctly
    expect(screen.getByText(/Your list is empty/i)).toBeInTheDocument();

    // Check if the icon is rendered (FiInbox)
    expect(screen.getByTestId("empty-state-icon")).toBeInTheDocument();
  });

  it("renders correctly with only title", () => {
    render(<EmptyState title="No Items" />);

    // Check if the title is rendered correctly
    expect(screen.getByText(/No Items/i)).toBeInTheDocument();

    // Check that subtitle is not in the document
    expect(screen.queryByText(/Your list is empty/i)).not.toBeInTheDocument();
  });
});
