import { useOutletContext } from "react-router";
import ShopItem from "../../components/ShopItem/ShopItem";
import styles from "./Shop.module.css";

const Shop = () => {
  const { items, loading } = useOutletContext();

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>
  }

  return (
    <div className={styles.shopItems}>
      {items.map(item => 
        <div key={item.id} className={styles.shopItem}>
          <ShopItem item={item} />
      </div>)}
    </div>
  );

}

export default Shop;