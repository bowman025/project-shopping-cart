import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import routes from "../../routes";
import { vi, expect, test, beforeEach } from "vitest";

vi.unmock('react-router');

beforeEach(() => {
  sessionStorage.clear();
});

test("cart data persists after page reload", async () => {
  const user = userEvent.setup();
  const firstRouter = createMemoryRouter(routes, {
    initialEntries: ["/shop"],
  });
	const { unmount } = render(<RouterProvider router={firstRouter} />);
  await screen.findByText(/Fake Keyboard/i);
  const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
	await user.click(addButtons[0]);

  expect(screen.getByText(/cart: 1/i)).toBeInTheDocument();

	unmount();
  const secondRouter = createMemoryRouter(routes, {
    initialEntries: ["/shop"],
  });
  render(<RouterProvider router={secondRouter} />);
	const cartCount = await screen.findByText(/cart: 1/i);

  expect(cartCount).toBeInTheDocument();
});

test("RootLayout updates sessionStorage when cart changes", async () => {
	const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
	const user = userEvent.setup();
	const router = createMemoryRouter(routes, {
		initialEntries: ["/shop"],
	});
	render(<RouterProvider router={router} />);
	const addButtons = await screen.findAllByRole("button", { name: /add to cart/i });
	setItemSpy.mockClear();
	await user.click(addButtons[0]);
	await waitFor(() => {
			expect(setItemSpy).toHaveBeenCalledWith("shopping_cart", expect.any(String));
	});
	const savedData = JSON.parse(setItemSpy.mock.calls[0][1]);

	expect(savedData.length).toBe(1);
});

test("shows a toast notification when an item is added", async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, {
    initialEntries: ["/shop"],
  });
  render(<RouterProvider router={router} />);
  const addButtons = await screen.findAllByRole("button", { name: /add to cart/i });
  await user.click(addButtons[0]);
  const toast = await screen.findByRole("alert");
  
  expect(toast).toBeInTheDocument();
  expect(toast).toHaveTextContent(/added to cart/i);

  await waitFor(() => {
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  }, { timeout: 3000 });
});