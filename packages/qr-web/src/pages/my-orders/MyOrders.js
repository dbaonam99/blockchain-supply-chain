import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/account';
import _ from 'lodash';
import Cta from '../../components/Cta/Cta';
import Modal from '../../components/Modal/Modal';
import Status from '../../components/Status/Status';
import AdminLayout from '../../Layouts/AdminLayout';
import QRCode from 'react-qr-code';
import {
  useGetOrdersQuery,
  useMaskAsHarvestMutation,
  useVerifyOrderMutation,
  usePublishAnOrderMutation,
} from '../../queries/order';
import { web3 } from '../../queries/web3';
import UserService from '../../services/user.service';
import { timeConverter } from '../../utils/time';
import styles from './MyOrders.module.css';

function MyOrders({ history }) {
  const [data, setData] = useState([]);
  const { data: orders, refetch } = useGetOrdersQuery();
  const { userInfo, account } = useAuth();
  const maskAsHarvestMutation = useMaskAsHarvestMutation();
  const verifyOrderMutation = useVerifyOrderMutation();
  const publishOrderMutation = usePublishAnOrderMutation();
  const [openQrModal, setOpenQrModal] = useState();
  const [qrCode, setQrCode] = useState('');

  const getUserByAddress = async (address) => {
    const res = await UserService.getByAddress({
      address,
    });
    return res.data.user;
  };

  useEffect(() => {
    if (!orders) return;
    const _data = _.cloneDeep(
      orders.filter((item) =>
        userInfo?.role === 'farmer'
          ? item[3] === account?.address
          : item[2] === account?.address && item[8] !== 'STATUS_DELETED'
      )
    );
    _data.map(async (order) => {
      const owner = await getUserByAddress(order[2]);
      const farmer = await getUserByAddress(order[3]);
      order.push(owner);
      order.push(farmer);
      refetch();
    });
    setData(_data);
  }, [orders]);

  const handleOnUpdateOrder = (orderId) => {
    history.push(`/my-orders/${orderId}`);
  };

  const markAsHarvested = (orderId) => {
    maskAsHarvestMutation.mutate(
      { orderId },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const verifyOrder = (orderId) => {
    verifyOrderMutation.mutate(
      { orderId },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const createQRCode = (order) => {
    const keyPair = web3.eth.accounts.create();
    publishOrderMutation.mutate(
      { orderId: order[0], publicKey: keyPair.address },
      {
        onSuccess: () => {
          refetch();
          setOpenQrModal(true);
          setQrCode(
            `http://192.168.1.193:3000/check-order/${keyPair.privateKey}`
          );
        },
      }
    );
  };

  return (
    <AdminLayout buttonType="add" title="My Orders">
      <Modal
        open={openQrModal}
        onClose={() => setOpenQrModal(false)}
        title="QR Code"
      >
        <QRCode value={qrCode} size="150" />
      </Modal>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Product Information</th>
            <th>Status</th>
            <th>Crop Information</th>
            <th>Action</th>
          </tr>
          {data?.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item[0]}</td>
                <td>
                  <p>Name: {item[1]}</p>
                  <p>Amount: {item[5]}kg</p>
                  <p>Owner: {item[14]}</p>
                  <p>Farmer: {item[15]}</p>
                </td>
                <td>
                  <Status text={item[8]} />
                  <p>Order: {timeConverter(item[6])}</p>
                  <p>Delivery: {timeConverter(item[7])}</p>
                  {/* <p>
                      {parseInt(Number(item[3]), 16) === 0
                        ? 'Waiting request'
                        : 'Farmer request to get an order '}
                    </p> */}
                </td>
                <td>
                  <p>Seed Name: {item[9]}</p>
                  <p>Sowing: {timeConverter(item[10])}</p>
                  <p>
                    Harvest:{' '}
                    {item[11] !== '0' ? timeConverter(item[11]) : 'Not yet'}
                  </p>
                  {item[12].length > 0 && (
                    <table className={`${styles.table} ${styles.tableSmall}`}>
                      <tbody>
                        <tr>
                          <th>Time</th>
                          <th>Fertilizer</th>
                          <th>Pesticides</th>
                          <th>Watering</th>
                        </tr>
                        {item[12].map((item) => (
                          <tr key={item[0]}>
                            <td>{timeConverter(item[0])}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {item[8] === 'STATUS_PRODUCING' &&
                      userInfo?.role === 'farmer' && (
                        <Cta
                          type="update"
                          onClick={() => handleOnUpdateOrder(item[0])}
                        />
                      )}
                    {item[8] === 'STATUS_PRODUCING' &&
                      userInfo?.role === 'farmer' && (
                        <Cta
                          type="harvested"
                          onClick={() => markAsHarvested(item[0])}
                        />
                      )}
                    {item[8] === 'STATUS_HARVESTED' &&
                      userInfo?.role === 'coopmart' && (
                        <Cta
                          type="verify"
                          onClick={() => verifyOrder(item[0])}
                        />
                      )}
                    {item[8] === 'STATUS_VERIFIED' &&
                      userInfo?.role === 'coopmart' && (
                        <Cta type="qrCode" onClick={() => createQRCode(item)} />
                      )}
                    {userInfo?.role === 'farmer' &&
                      item[8] === 'STATUS_HARVESTED' && <div>Waiting...</div>}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default MyOrders;
