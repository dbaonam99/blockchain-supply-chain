import React from 'react';
import { IoMdClose } from 'react-icons/io';

import styles from './Modal.module.css';

function Modal({ open, onClose, title, children }) {
  return (
    <div
      className={open ? styles.modal : styles.hidden}
      id="container"
      onClick={(event) => {
        if (event.target.id === 'container') {
          onClose();
        }
      }}
    >
      <div className={styles.modalBox}>
        <div className={styles.heading}>
          <p>{title}</p>
          <IoMdClose onClick={onClose} />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
