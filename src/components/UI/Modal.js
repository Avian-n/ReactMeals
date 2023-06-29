import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
  return (
    <div
      onClick={props.onClose}
      className={classes.backdrop}
    ></div>
  );
};

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const overlayRoot = document.getElementById('overlays');

const Modal = props => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose} />, overlayRoot)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayRoot)}
    </Fragment>
  );
};

export default Modal;
