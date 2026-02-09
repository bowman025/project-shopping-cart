import { 
  vi,
  expect,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import { server } from "./mocks/server";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useOutletContext: vi.fn(() => ({
      cart: [],
      items: [],
      loading: false,
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    })),
  }
});

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => server.close());