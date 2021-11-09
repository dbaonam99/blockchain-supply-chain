import React from 'react';
import { IoAppsSharp } from 'react-icons/io5';
import styles from './Header.module.css';

function Header({ userData }) {
  return (
    <div className={styles.header}>
      <div className={styles.changeSideBar}>
        <IoAppsSharp />
      </div>
      <p>{userData?.role}</p>
    </div>
  );
}

export default Header;
