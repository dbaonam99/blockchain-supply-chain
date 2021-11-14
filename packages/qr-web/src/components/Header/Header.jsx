import React from 'react';
import { IoAppsSharp } from 'react-icons/io5';
import { useAuth } from '../../auth/account';
import styles from './Header.module.css';

function Header() {
  const { userInfo } = useAuth();
  return (
    <div className={styles.header}>
      <div className={styles.changeSideBar}>
        <IoAppsSharp />
      </div>
      <p>{userInfo?.role}</p>
    </div>
  );
}

export default Header;
