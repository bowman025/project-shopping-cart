import { useOutletContext } from "react-router";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useOutletContext();

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );

  if (cart.length === 0) {
    return (
      <div className={styles.cartPage}>
        <h2>Your cart is empty.</h2>
        <p>Go buy something nice!</p>
      </div>
    );
  }
  return (
      <div className={styles.cartPage}>
        <h1>Your Shopping Cart</h1>
        <div className={styles.cartItems}>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <div className={styles.quantityControls}>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>Quantity: {item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p>Subtotal: ${item.price * item.quantity}</p>
              </div>
              <button 
                className={styles.removeBtn} 
                onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
            </div>
          ))}
        </div>
        <hr />
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