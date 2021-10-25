import React from 'react';
import { IoAppsSharp } from 'react-icons/io5';
import styles from './Header.module.css';

function Header() {
  return <div className={styles.header}>
    <div className={styles.changeSideBar}>
      <IoAppsSharp/>
    </div>
    <p>Dương Bảo Nam</p>
  </div>;
}

export default Header;
