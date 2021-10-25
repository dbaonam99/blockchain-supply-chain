import React from 'react';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sideBar}>
      {/* <ContentTypeModal
        modalIsOpen={modalIsOpen}
        closeModal={() => setIsOpen('')}
      /> */}
      <div className={styles.overlay} />
      <div className={styles.menu}>
        <div className={styles.logo}>N3T</div>
        {/* <ContentType type="collection" openModal={() => setIsOpen('collection')} />
        <ContentType type="single" openModal={() => setIsOpen('single')} /> */}
      </div>
    </div>
  );
}

export default Sidebar;
