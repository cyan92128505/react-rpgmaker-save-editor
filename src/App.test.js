import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const saveSelector = screen.getByText(/Select Save/i);
  expect(saveSelector).toBeInTheDocument();
});
