import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import Input from '../../components/Input/Input';
import styles from './CreateOrder.module.css';
import { useCreateOrderMutation } from '../../queries/order';

function CreateOrder({ history }) {
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const createOrderMutation = useCreateOrderMutation();

  const handleOnSubmit = async () => {
    createOrderMutation.mutate(
      {
        productName,
        amount,
        deliveryDate: Math.floor(new Date(deliveryDate) / 1000),
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            history.push('/');
          }, 2000);
        },
      }
    );
  };

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
          onChange={(event) => {
            if (event.target.value) {
              setDeliveryDate(event.target.value);
            }
          }}
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
