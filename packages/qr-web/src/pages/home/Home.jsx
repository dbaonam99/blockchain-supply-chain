import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import ContentTypeBody from './ContentTypeBody/ContentTypeBody';
import styles from './Home.css';

function Home() {
  return (
    <div className={styles.cmsAdmin}>
      <Sidebar />
      <div className={styles.cmsRight}>
        <Header />
        <ContentTypeBody />
      </div>
    </div>
  );
}

export default Home;
