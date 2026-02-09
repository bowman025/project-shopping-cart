import { render, screen } from "@testing-library/react";
import { 
  BrowserRouter, 
  RouterProvider, 
  createMemoryRouter, } from "react-router";
import { useOutletContext } from "react-router";
import { vi, expect, test } from "vitest";
import routes from "../../routes";
import Shop from "./Shop";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useOutletContext: vi.fn() };
});

test(
  "renders products fetched from the API", 
  async () => {
  useOutletContext.mockReturnValue({
    items: [
      { id: 1, title: 'Fake Keyboard', price: 29.99 },
      { id: 2, title: 'Fake Mouse', price: 9.99 },
    ],
    loading: false,
  });

  render(
    <BrowserRouter>
      <Shop />
    </BrowserRouter>
  );

  const item1 = await screen.findByText(/fake keyboard/i);
  const item2 = await screen.findByText(/fake mouse/i);

  expect(item1).toBeInTheDocument();
  expect(item2).toBeInTheDocument();
});

test(
  "full integration: fetches data from MSW and displays in Shop", 
  async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/shop"],
  });

  render(<RouterProvider router={router}/>);

  const item = await screen.findByText(/fake keyboard/i);
  expect(item).toBeInTheDocument();
});
