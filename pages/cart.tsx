import React from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/cart/cart.module.css';

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.h1}>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img src={item.image_url} alt={item.title} />
              <div>
                <h3 className={styles.h3}>{item.title}</h3>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
