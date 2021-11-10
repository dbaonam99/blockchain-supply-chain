import React from 'react';
import { withRouter } from 'react-router';
import styles from './Sidebar.module.css';

const navItems = [
  {
    id: 1,
    name: 'Orders management',
    route: '/orders',
  },
  {
    id: 2,
    name: 'Verify order',
    route: '/check-order',
  },
];

function Sidebar({ location, history }) {
  return (
    <div className={styles.sideBar}>
      <div className={styles.overlay} />
      <div className={styles.menu}>
        <div className={styles.logo}>N3T</div>
        <div className={styles.items}>
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.item}
                ${
                  location.pathname.split('/')[1] ===
                    item.route.split('/')[1] && styles.itemActive
                }`}
              onClick={() => history.push(item.route)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Sidebar);
