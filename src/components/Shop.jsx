import { useState, useEffect } from "react";
import styles from "./Shop.module.css";

const Shop = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController(); //
    
    const fetchItems = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`, { 
          signal: controller.signal 
        });
        const data = await response.json();
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    };

    fetchItems();

    return () => controller.abort();
  }, []);

  return (
    <div className={styles.shopItems}>
      {items.map(item => <div key={item.id} className={styles.shopItem}>
        <h2>{item.title}</h2>
        <img src={item.image} alt={item.title} />
        <p>{item.description}</p>
        <p>{item.price}</p>
        </div>)}
    </div>
  );

}

export default Shop;