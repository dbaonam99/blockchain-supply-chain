import React, { useEffect, useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import Input from '../../components/Input/Input';
import { useParams } from 'react-router-dom';
import styles from './UpdateOrder.module.css';
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useUpdateCropMutation,
} from '../../queries/order';
import { timeConverter } from '../../utils/time';

function UpdateOrder() {
  const { data: orders, refetch } = useGetOrdersQuery();
  const params = useParams();
  const [data, setData] = useState({});
  const [seedName, setSeedName] = useState('');
  const [sowingDate, setSowingDate] = useState('');
  const [fertilizer, setFertilizer] = useState('');
  const [pesticides, setPesticides] = useState('');
  const [watering, setWatering] = useState('');

  const updateOrderMutation = useUpdateOrderMutation();
  const updateCropMutation = useUpdateCropMutation();

  useEffect(() => {
    if (!orders) return;
    const _data = orders.filter((item) => item[0] === params.id)[0];
    setSeedName(_data[9]);
    setSowingDate(new Date(_data[10] * 1000).toISOString().split('T')[0]);
    setData(_data);
  }, [orders, params.id]);

  const updateOrder = async () => {
    updateOrderMutation.mutate(
      {
        orderId: data[0],
        seedName,
        sowingDate: Math.floor(new Date(sowingDate) / 1000),
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const updateCrop = () => {
    updateCropMutation.mutate(
      {
        orderId: data[0],
        fertilizer,
        pesticides,
        watering,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <AdminLayout title="Update order" back>
      <div>
        <Input
          label="Seed Name"
          value={seedName}
          onChange={(event) => setSeedName(event.target.value)}
        />
        <Input
          label="Sowing Date"
          type="date"
          value={sowingDate}
          onChange={(event) => {
            if (event.target.value) {
              setSowingDate(event.target.value);
            }
          }}
        />
        <div className={styles.buttonRow}>
          <div className={styles.addBtn} onClick={() => updateOrder()}>
            Update
          </div>
        </div>
      </div>
      <div>Crop information</div>
      {data[12]?.map((item) => (
        <div className={styles.cropRow}>
          <div>
            <b>Date:</b> {timeConverter(item[0])}
          </div>
          <div>
            <b>Fertilizer:</b> {item[1]}
          </div>
          <div>
            <b>Pesticides:</b> {item[2]}
          </div>
          <div>
            <b>Watering:</b> {item[3]}
          </div>
        </div>
      ))}
      <div>
        <Input
          label="Fertilizer"
          value={fertilizer}
          onChange={(event) => setFertilizer(event.target.value)}
        />
        <Input
          label="Pesticides"
          value={pesticides}
          onChange={(event) => setPesticides(event.target.value)}
        />
        <Input
          label="Watering"
          value={watering}
          onChange={(event) => setWatering(event.target.value)}
        />
        <div className={styles.buttonRow}>
          <div className={styles.addBtn} onClick={updateCrop}>
            Update Crop information
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default UpdateOrder;
