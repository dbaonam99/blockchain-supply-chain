import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/account';
import _ from 'lodash';
import Cta from '../../components/Cta/Cta';
import Status from '../../components/Status/Status';
import AdminLayout from '../../Layouts/AdminLayout';
import {
  useAcceptFarmerMutation,
  useGetAnOrderMutation,
  useGetOrdersQuery,
  useDeleteAnOrderMutation,
} from '../../queries/order';
import UserService from '../../services/user.service';
import { timeConverter } from '../../utils/time';
import styles from './Home.module.css';

function Home({ location, history }) {
  const [data, setData] = useState([]);
  const { data: orders, refetch } = useGetOrdersQuery();
  const { userInfo } = useAuth();
  const getAnOrder = useGetAnOrderMutation();
  const acceptFarmer = useAcceptFarmerMutation();
  const deleteAnOrder = useDeleteAnOrderMutation();

  const getUserByAddress = async (address) => {
    const res = await UserService.getByAddress({
      address,
    });
    return res.data.user;
  };

  useEffect(() => {
    if (!orders) return;
    const _data = _.cloneDeep(
      orders.filter((item) => item[8] === 'STATUS_CREATED')
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

  const handleAcceptFarmer = (orderId, isAccept) => {
    acceptFarmer.mutate(
      { orderId, isAccept },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleGetAOrder = (orderId) => {
    getAnOrder.mutate(
      {
        role: userInfo.role,
        orderId,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleDelete = (orderId) => {
    deleteAnOrder.mutate(
      {
        orderId,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  if (location.pathname === '/') {
    history.push('/orders');
  }

  console.log(data);

  return (
    <AdminLayout buttonType="add" title="Orders">
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Product Information</th>
            <th>Status</th>
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
                </td>
                <td>
                  <Status text={item[8]} />
                  <p>Order Date: {timeConverter(item[6])}</p>
                  <p>Delivery Date: {timeConverter(item[7])}</p>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {userInfo?.role === 'farmer' &&
                      parseInt(Number(item[3]), 16) === 0 && (
                        <Cta
                          type="getOrder"
                          onClick={() => handleGetAOrder(item[0])}
                        />
                      )}
                    {userInfo?.role === 'farmer' &&
                      parseInt(Number(item[3]), 16) !== 0 && (
                        <div>Waiting...</div>
                      )}
                    {userInfo?.role === 'coopmart' &&
                      parseInt(Number(item[3]), 16) !== 0 &&
                      item[4] === false && (
                        <Cta
                          type="check"
                          onClick={() => handleAcceptFarmer(item[0], true)}
                        />
                      )}
                    {userInfo?.role === 'coopmart' && (
                      <Cta
                        type="delete"
                        onClick={() => handleDelete(item[0])}
                      />
                    )}
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

export default Home;
