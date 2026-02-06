import { Link } from "react-router";
import { Outlet } from "react-router";
import Home from "./Home";

const App = () => {

  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="shop">Shop</Link>
          <button>Cart</button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Made by bowman025.</p>
      </footer>
    </>
  )
}

export default App;
