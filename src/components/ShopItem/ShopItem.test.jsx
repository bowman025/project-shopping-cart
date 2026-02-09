import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, useOutletContext } from "react-router";
import { vi, expect, test } from "vitest";
import ShopItem from "./ShopItem";

const mockProduct = { id: 1, name: "Test Item", price: 10 };

test("increments quantity when + button is clicked", () => {
  render(
    <BrowserRouter>
      <ShopItem item={mockProduct} />
    </BrowserRouter>
  );

  const plusButton = screen.getByRole("button", { name: /\+/i });
  const input = screen.getByRole("spinbutton");

  fireEvent.click(plusButton);
  expect(input.value).toBe("2");
});

test("triggers addToCart function", () => {
  const addToCartSpy = vi.fn();
  
  vi.mocked(useOutletContext).mockReturnValue({
    addToCart: addToCartSpy
  });

  render(
    <BrowserRouter>
      <ShopItem item={mockProduct} />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
  expect(addToCartSpy).toHaveBeenCalled();
});