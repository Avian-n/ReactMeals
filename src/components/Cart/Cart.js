import { createPortal } from 'react-dom';
import { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isFinishedCheckout, setIsFinishedCheckout] = useState(false);
  const { isLoading, error, sendRequest: sendCartData } = useHttp();

  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemAddHandler = item => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = id => {
    cartContext.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = userData => {
    sendCartData(
      {
        url: 'https://react-course-30544-default-rtdb.europe-west1.firebasedatabase.app/Orders.json',
        method: 'POST',
        body: {
          user: userData,
          orderedItems: cartContext.items,
        },
        headers: { ContentType: 'application/json' },
      },
      finishCheckout
    );
  };

  const finishCheckout = () => {
    cartContext.clearCart();
    setIsFinishedCheckout(true);
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

  const modalActions = (
    <div className={classes.actions}>
      <button
        onClick={props.onClose}
        className={classes['button--alt']}
      >
        Close
      </button>
      {hasItems && (
        <button
          onClick={orderHandler}
          className={classes.button}
        >
          Order
        </button>
      )}
    </div>
  );

  let modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && !isLoading && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
        />
      )}
      {isCheckout && isLoading && <LoadingSpinner />}
      {!isCheckout && modalActions}
    </Fragment>
  );

  if (isCheckout && !isLoading && error) {
    modalContent = (
      <h2>Something went wrong while submitting your order. Please try again later</h2>
    );
  }

  if (isCheckout && !isLoading && !error && isFinishedCheckout) {
    modalContent = <h2>Thank you for your order. We will contact you ASAP</h2>;
  }

  return <Modal onClose={props.onClose}>{modalContent}</Modal>;
};

export default Cart;
