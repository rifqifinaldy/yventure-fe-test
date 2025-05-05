import { render, screen, fireEvent } from "@testing-library/react";
import TodoCard from "./index";
import { ITodo } from "@app/libs/types/todo.types";

describe("TodoCard", () => {
  const mockTodo: ITodo = {
    id: "1",
    task: "Test task",
    isCompleted: false,
    updatedAt: "2024-01-01",
  };

  const mockHandlers = {
    handleDelete: jest.fn(),
    handleEdit: jest.fn(),
    handleToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders todo data correctly", () => {
    render(
      <TodoCard
        todo={mockTodo}
        isEditing={false}
        isLoading={false}
        {...mockHandlers}
      />
    );

    expect(screen.getByText("Test task")).toBeInTheDocument();
    expect(screen.getByText(/Last Updated:/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls handleToggle when checkbox is clicked", () => {
    render(
      <TodoCard
        todo={mockTodo}
        isEditing={false}
        isLoading={false}
        {...mockHandlers}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockHandlers.handleToggle).toHaveBeenCalledWith({
      ...mockTodo,
      isCompleted: true,
    });
  });

  it("calls handleDelete and handleEdit when icons are clicked", () => {
    render(
      <TodoCard
        todo={mockTodo}
        isEditing={false}
        isLoading={false}
        {...mockHandlers}
      />
    );

    const deleteIcon = screen.getByTestId("delete-icon");
    const editIcon = screen.getByTestId("edit-icon");

    fireEvent.click(deleteIcon);
    fireEvent.click(editIcon);

    expect(mockHandlers.handleDelete).toHaveBeenCalledWith("1");
    expect(mockHandlers.handleEdit).toHaveBeenCalledWith(mockTodo);
  });

  it("shows loading overlay when isLoading is true", () => {
    render(
      <TodoCard
        todo={mockTodo}
        isEditing={false}
        isLoading={true}
        {...mockHandlers}
      />
    );

    expect(screen.getByText(/Last Updated:/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("applies active class when isEditing is true", () => {
    render(
      <TodoCard
        todo={mockTodo}
        isEditing={true}
        isLoading={false}
        {...mockHandlers}
      />
    );

    const wrapper = screen.getByTestId("todo-card-wrapper");
    expect(wrapper).toHaveClass("active");
  });
});
