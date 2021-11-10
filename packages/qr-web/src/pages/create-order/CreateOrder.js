import React, { useState } from 'react';

import AdminLayout from '../../Layouts/AdminLayout';
import Input from '../../components/Input/Input';
import styles from './CreateOrder.module.css';

// import { nftAddress, nftMarketAddress } from '../../config';

// import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
// import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

function CreateOrder() {
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const handleOnSubmit = async () => {};

  return (
    <AdminLayout title="Create order">
      <div>
        <Input
          label="Product Name"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />
        <Input
          label="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <Input
          label="Delivery Date"
          type="date"
          value={deliveryDate}
          onChange={(event) => setDeliveryDate(event.target.value)}
        />
        <div className={styles.buttonRow}>
          <div className={styles.addBtn} onClick={handleOnSubmit}>
            Add
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateOrder;
