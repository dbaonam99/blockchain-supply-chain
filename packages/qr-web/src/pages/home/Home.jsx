import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import ContentTypeBody from './ContentTypeBody/ContentTypeBody';
import UserService from '../../services/user.service';
import styles from './Home.module.css';

function Home({ history }) {
  const [userData, setUserData] = useState();
  useEffect(() => {
    UserService.getUserInfo().then(
      (res) => {
        setUserData(res.data);
      },
      (error) => {
        console.log(error);
        history.push('/login');
      }
    );
  }, [history]);

  return (
    <div className={styles.cmsAdmin}>
      <div className={styles.cmsLeft}>
        <Sidebar />
      </div>
      <div className={styles.cmsRight}>
        {userData && <Header userData={userData} />}
        <ContentTypeBody />
      </div>
    </div>
  );
}

export default Home;
