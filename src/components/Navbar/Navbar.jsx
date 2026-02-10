import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import homeUrl from "../../assets/home.svg";
import shopUrl from "../../assets/shop.svg";
import cartUrl from "../../assets/cart.svg";

const Navbar = ({ totalItems }) => {
  return (
    <>
      <h1 className={styles.navTitle}><NavLink to="/">The Random Store</NavLink></h1>
      <nav className={styles.navBar}>
        <ul className={styles.navLinks}>
          <li>
            <NavLink to="/" className={styles.navHome}>
              <img src={homeUrl} alt="home" />
            </NavLink>
          </li>
          <li>
            <NavLink to="shop" className={styles.navShop}>
              <img src={shopUrl} alt="shop" />
            </NavLink>
          </li>
          <li>
            <NavLink to="cart" className={styles.navCart}>
              <img src={cartUrl} alt="cart" /> {totalItems}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;