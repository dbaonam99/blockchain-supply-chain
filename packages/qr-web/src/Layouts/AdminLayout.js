import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import UserService from '../services/user.service';
import styles from './AdminLayout.module.css';
import { withRouter } from 'react-router';
import { useAuth } from '../auth/account';
import './AdminLayout.module.css';

function AdminLayout({ history, children, buttonType, title }) {
  const { getUserInfo } = useAuth();
  useEffect(() => {
    UserService.getUserInfo().then(
      (res) => {
        getUserInfo(res.data);
      },
      (error) => {
        console.log(error);
        history.push('/login');
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <div className={styles.cmsAdmin}>
      <div className={styles.cmsLeft}>
        <Sidebar />
      </div>
      <div className={styles.cmsRight}>
        <Header />
        <div className={styles.cmsBody}>
          <div className={styles.heading}>
            <p>{title}</p>
            <div
              className={styles.addBtn}
              onClick={() => {
                if (buttonType === 'add') history.push('/orders/create-order');
                else history.goBack();
              }}
            >
              {buttonType === 'add' ? 'Add new' : 'Back'}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default withRouter(AdminLayout);
