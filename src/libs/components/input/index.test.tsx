import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "./index";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("InputField", () => {
  it("should render the input with a label and value", () => {
    render(
      <Wrapper>
        <InputField id="test-id" name="test-name" label="Test Label" />
      </Wrapper>
    );

    const input = screen.getByLabelText(/Test Label/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "test-id");
    expect(input).toHaveAttribute("name", "test-name");
  });

  it("should display an error message when errorMessage is passed", () => {
    render(
      <Wrapper>
        <InputField id="test-id" name="test-name" errorMessage="Test error" />
      </Wrapper>
    );
    const errorMessage = screen.getByText(/Test error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should display the loading spinner when isLoading is true", () => {
    render(
      <Wrapper>
        <InputField
          id="test-id"
          name="test-name"
          isLoading={true}
          label="Test Label"
        />
      </Wrapper>
    );

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("should disable the input when inputProps contains disabled attribute", () => {
    render(
      <Wrapper>
        <InputField
          id="test-id"
          name="test-name"
          inputProps={{ disabled: true }}
        />
      </Wrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});
