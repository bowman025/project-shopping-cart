import { useOutletContext, Link } from "react-router";
import styles from "./Cart.module.css";
import shopUrl from "../../assets/shop.svg";
import trashUrl from "../../assets/trash.svg";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useOutletContext();

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );

  if (cart.length === 0) {
    return (
      <div className={styles.cartPage}>
        <h2 className={styles.cartEmptyH2}>Your cart is empty.</h2>
        <p className={styles.cartEmptyP}>Go put something nice in it!</p>
        <Link to="/shop" className={styles.cartShop}>
          <img className={styles.cartShopImg} src={shopUrl} alt="shop" />
        </Link>
      </div>
    );
  }
  return (
      <div className={styles.cartPage}>
        <h1 className={styles.cartTitle}>Your Shopping Cart</h1>
        <div className={styles.cartItems}>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <img className={styles.itemImg} src={item.image} alt="" />
                <div className={styles.itemText}>
                  <h3>{item.title}</h3>
                  <p>
                    <span className={styles.itemAmountText}>Price: </span>
                    <span className={styles.itemAmountX}>${item.price}</span>
                  </p>
                  <div className={styles.quantityControls}>
                    <div>
                      <span className={styles.itemAmountText}>Amount: </span>
                      <span className={styles.itemAmountX}>{item.quantity}</span>
                    </div>
                    <div className={styles.quantityBtns}>
                      <button 
                        className={styles.minusBtn}
                        onClick={() => updateQuantity(item.id, -1)}>
                          <span className={styles.minusWrapper}>-</span>
                      </button>
                      <button 
                        className={styles.plusBtn}
                        onClick={() => updateQuantity(item.id, 1)}>
                          <span className={styles.plusWrapper}>+</span>
                      </button>
                    </div>
                  </div>
                  <p>
                    <span className={styles.itemAmountText}>Subtotal: </span>
                    <span className={styles.itemAmountX}>${item.price * item.quantity}</span>
                  </p>
                </div>
              </div>
              <button 
                className={styles.removeBtn} 
                onClick={() => removeFromCart(item.id)}>
                  <img src={trashUrl} alt="remove" />
                </button>
            </div>
          ))}
        </div>
        <div className={styles.cartSummary}>
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          <button 
            className={styles.clearBtn} 
            onClick={clearCart}>
              Clear Entire Cart
          </button>
          <button 
            className={styles.checkoutBtn}
            onClick={() => window.alert("Checkout feature not implemented.")}>
              Proceed To Checkout
          </button>
        </div>
      </div>
  );
}

export default Cart;