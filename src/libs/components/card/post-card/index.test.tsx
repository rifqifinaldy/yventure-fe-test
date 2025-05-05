import { render, screen } from "@testing-library/react";
import PostCard from "./index";
import { IPost } from "@app/libs/types/post.type";

describe("PostCard", () => {
  const mockPost: IPost = {
    userId: 42,
    id: 101,
    title: "Sample Post Title",
    body: "This is the body of the sample post.",
  };

  it("renders post data correctly", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText(/User ID/i)).toBeInTheDocument();
    expect(screen.getByText(/42/)).toBeInTheDocument();
    expect(screen.getByText("101")).toBeInTheDocument();
    expect(screen.getByText("Sample Post Title")).toBeInTheDocument();
    expect(
      screen.getByText(/This is the body of the sample post/i)
    ).toBeInTheDocument();
  });
});
