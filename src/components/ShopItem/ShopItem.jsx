import { useState } from "react";
import { useOutletContext } from "react-router";
import styles from "./ShopItem.module.css";

const ShopItem = ({ item }) => {
  const { addToCart } = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    setQuantity(isNaN(val) || val < 1 ? 1 : val);
  };

  return (
    <div className={styles.itemCard}>
      <h3>{item.title}</h3>
      <img src={item.image} alt="" />
      <p>${item.price}</p>
      <div className={styles.controls}>
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
        <input 
          id={"quantity-" + item.id}
          name={"quantity-" + item.id}
          type="number" 
          value={quantity} 
          onChange={handleQuantityChange} 
          min="1"
        />
        <button onClick={() => setQuantity(q => q + 1)}>+</button>
      </div>
      <button onClick={() => addToCart(item, quantity)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ShopItem;