import { useState } from "react";
import { useOutletContext } from "react-router";
import styles from "./ShopItem.module.css";
import cartAddUrl from "../../assets/cart_add.svg";

const ShopItem = ({ item }) => {
  const { addToCart } = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    setQuantity(isNaN(val) || val < 1 ? 1 : val);
  };

  return (
    <>
      <div className={styles.itemTop}>
        <h3>{item.title}</h3>
        <img src={item.image} alt="" className={styles.image} />
      </div>
      <div className={styles.itemBottom}>
        <p>${item.price}</p>
        <div className={styles.controls}>
          <div className={styles.quantity}>
            <input
            className={styles.quantityInput}
              id={"quantity-" + item.id}
              name={"quantity-" + item.id}
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <div className={styles.quantityBtns}>
              <button 
                className={styles.plusBtn}
                onClick={() => setQuantity(q => q + 1)}>
                  <span className={styles.plusWrapper}>+</span>
              </button>
              <button 
                className={styles.minusBtn}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <span className={styles.minusWrapper}>-</span>
              </button>
            </div>
          </div>
          <button className={styles.addBtn} onClick={() => addToCart(item, quantity)}>
            <img src={cartAddUrl} alt="add to cart" />
          </button>
        </div>
        
      </div>
    </>
  );
};

export default ShopItem;