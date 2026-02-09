import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useOutletContext } from "react-router";
import { vi, expect, test } from "vitest";
import Cart from "./Cart";

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return { ...actual, useOutletContext: vi.fn() };
});

const mockCart = [
  { 
    id: 1, 
    title: "Mechanical Keyboard", 
    price: 100, 
    quantity: 2, 
  },
  { 
    id: 2, 
    title: "Gaming Mouse", 
    price: 50, 
    quantity: 1,
  },
];

test(
  "renders cart items with correct quantity and subtotal", 
  () => {
    useOutletContext.mockReturnValue({
      cart: mockCart,
      updateQuantity: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
    });

    render(<Cart />);

    expect(screen.getByText(/mechanical keyboard/i)).toBeInTheDocument();
    expect(screen.getByText(/gaming mouse/i)).toBeInTheDocument();
    expect(screen.getByText(/\$200/)).toBeInTheDocument();
    expect(screen.getByText(/total: \$250/i)).toBeInTheDocument();
});

test("calls updateQuantity with correct arguments", async () => {
  const user = userEvent.setup();
  const updateQuantitySpy = vi.fn();

  useOutletContext.mockReturnValue({
    cart: [{ id: 1, title: "Keyboard", price: 100, quantity: 2 }],
    updateQuantity: updateQuantitySpy,
    removeFromCart: vi.fn(),
    clearCart: vi.fn(),
  });

  render(<Cart />);

  const plusButton = screen.getByRole("button", { name: /\+/i});
  const minusButton = screen.getByRole("button", { name: /-/i});

  await user.click(plusButton);
  expect(updateQuantitySpy).toHaveBeenCalledWith(1, 1);

  await user.click(minusButton);
  expect(updateQuantitySpy).toHaveBeenCalledWith(1, -1);
});

test("calls clearCart when the clear button is clicked", async () => {
  const user = userEvent.setup();
  const clearCartSpy = vi.fn();

  useOutletContext.mockReturnValue({
    cart: mockCart,
    clearCart: clearCartSpy,
    updateQuantity: vi.fn(),
    removeFromCart: vi.fn(),
  });

  render(<Cart />);

  const clearButton = screen.getByRole("button", { name: /clear entire cart/i});
  await user.click(clearButton);

  expect(clearCartSpy).toHaveBeenCalledTimes(1);
})
