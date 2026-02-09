import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./RootLayout.module.css";

const RootLayout = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem("shopping_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchItems = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`, { 
          signal: controller.signal 
        });
        const data = await response.json();
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem, amount) => {
    if (amount < 1) return;

    setCart(cart => {
      const exists = cart.some(item => item.id === newItem.id);
      if (exists) {
        return cart.map(item => item.id === newItem.id
          ? {...item, quantity: item.quantity + amount}
          : item
        );
      }
      return [...cart, {...newItem, quantity: amount}];
    });

    showToast(`${newItem.title} added to cart`);
  }

  const removeFromCart = (itemId) => {
    setCart(cart => 
      cart.filter(item => item.id !== itemId)
    );
  }

  const clearCart = () => {
    setCart([]);
  }

  const updateQuantity = (itemId, delta) => {
    setCart(cart => {
      return cart.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return {...item, quantity: newQuantity};
        }
        return item;
      });
    });
  }

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2000);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className={styles.rootHeader}>
        <Navbar totalItems={totalItems} />
      </header>
      {toast && (
        <div 
          role="alert" 
          className={styles.toastNotification}>
            {toast}
        </div>
      )}
      <main className={styles.rootMain}>
        <Outlet context={
          { 
            items,
            loading,
            cart, 
            addToCart, 
            removeFromCart, 
            clearCart, 
            updateQuantity 
          }
        } />
      </main>
      <footer className={styles.rootFooter}>
        Made by <a href="https://github.com/bowman025">bowman025</a>.
      </footer>
    </>
  );
}

export default RootLayout;