import React from 'react';
import { useHistory } from 'react-router-dom';

import { IoAppsSharp } from 'react-icons/io5';
import { useAuth } from '../../auth/account';
import AuthService from '../../services/auth.service';
import styles from './Header.module.css';

function Header() {
  const { userInfo, account } = useAuth();
  let history = useHistory();
  const handleOnLogout = async () => {
    await AuthService.logout();
    history.push('/login');
  };
  return (
    <div className={styles.header}>
      <div className={styles.changeSideBar}>
        <IoAppsSharp />
      </div>
      <p className={styles.text}>
        {userInfo?.user} - {account?.address}
      </p>
      <button className={styles.button} onClick={handleOnLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;
