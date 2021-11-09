import React from 'react';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.overlay} />
      <div className={styles.menu}>
        <div className={styles.logo}>N3T</div>
        <div className={styles.items}>
          <div className={styles.itemActive}>Quản lý Đơn hàng</div>
          <div className={styles.item}>Kiểm duyệt hàng</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
