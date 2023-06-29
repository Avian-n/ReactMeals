import { createPortal } from 'react-dom';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

const Cart = props => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemAddHandler = item => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = id => {
    cartContext.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={props.onClose}
          className={classes['button--alt']}
        >
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
