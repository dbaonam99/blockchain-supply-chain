import React from 'react';
import { IoTrashBin } from 'react-icons/io5';
import { RiHandCoinFill, RiCheckFill, RiPencilFill } from 'react-icons/ri';
import { BiPackage } from 'react-icons/bi';
import { GoVerified } from 'react-icons/go';
import { ImQrcode } from 'react-icons/im';

import styles from './Cta.module.css';

const buttons = {
  delete: {
    icon: <IoTrashBin color="white" />,
    background: 'red',
  },
  getOrder: {
    icon: <RiHandCoinFill color="white" />,
    background: '#3063fc',
  },
  check: {
    icon: <RiCheckFill color="white" />,
    background: '#3ca407',
  },
  update: {
    icon: <RiPencilFill color="white" />,
    background: '#3ca407',
  },
  harvested: {
    icon: <BiPackage color="white" />,
    background: '#3063fc',
  },
  verify: {
    icon: <GoVerified color="white" />,
    background: '#3ca407',
  },
  qrCode: {
    icon: <ImQrcode color="white" />,
    background: '#3063fc',
  },
};

function Cta({ type, onClick }) {
  return (
    <div
      className={styles.cta}
      onClick={onClick}
      style={{ background: buttons[type].background }}
    >
      {buttons[type].icon}
    </div>
  );
}

export default Cta;
