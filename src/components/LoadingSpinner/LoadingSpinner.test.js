import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner Component", () => {
  test("renders spinner with default props", () => {
    render(<LoadingSpinner />);
    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass("medium", "primary", "light");
  });

  test("applies custom class name", () => {
    render(<LoadingSpinner className="custom-class" />);
    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toHaveClass("custom-class");
  });

  test("renders with correct aria-label", () => {
    render(<LoadingSpinner ariaLabel="Loading data..." />);
    const spinnerElement = screen.getByLabelText("Loading data...");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("renders spinner with small size", () => {
    render(<LoadingSpinner size="small" />);
    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toHaveClass("small");
  });

  test("renders spinner with dark theme", () => {
    render(<LoadingSpinner theme="dark" />);
    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toHaveClass("dark");
  });
});
