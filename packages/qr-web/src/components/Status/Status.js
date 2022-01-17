import React from 'react';
import styles from './Status.module.css';

const colors = {
  STATUS_CREATED: '#F98208',
  STATUS_PRODUCING: '#3063fc',
  STATUS_HARVESTED: '#3063fc',
  STATUS_VERIFIED: 'green',
};

function Status({ text }) {
  return (
    <div className={styles.root}>
      <div className={styles.status} style={{ color: colors[text] }}>
        {text.split('_')[1]}
      </div>
    </div>
  );
}

export default Status;
