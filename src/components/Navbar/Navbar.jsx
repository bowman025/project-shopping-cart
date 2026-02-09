import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = ({ totalItems }) => {
  return (
    <>
      <h1 className={styles.logo}>The Random Store</h1>
      <nav className={styles.navBar}>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="cart">Cart: {totalItems}</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;