import React from 'react';
import { useAuth } from '../../auth/account';
import AdminLayout from '../../Layouts/AdminLayout';
import {
  useAcceptFarmerMutation,
  useGetAnOrderMutation,
  useGetOrdersQuery,
} from '../../queries/order';
import { timeConverter } from '../../utils/time';
import styles from './Home.module.css';

function Home({ location, history }) {
  const { data: orders } = useGetOrdersQuery();
  const { userInfo } = useAuth();
  const getAnOrder = useGetAnOrderMutation();
  const acceptFarmer = useAcceptFarmerMutation();

  const getUserByAddress = (address) => {
    // console.log(address);
    // const res = await UserService.getUserInfoByAddress({
    //   address,
    // });
    return 'zxc';
  };

  const handleOnAcceptFarmer = (orderId, isAccept) => {
    acceptFarmer.mutate({ orderId, isAccept });
  };

  const handleOnGetAOrder = (orderId) => {
    getAnOrder.mutate({
      role: userInfo.role,
      orderId,
    });
  };

  if (location.pathname === '/') {
    history.push('/orders');
  }

  return (
    <AdminLayout buttonType="add" title="Orders">
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Owner</th>
            <th>Farmer</th>
            <th>Status</th>
            <th>Crop Information</th>
            <th>Action</th>
          </tr>
          {orders?.map((item, idx) => {
            console.log(item);
            return (
              <tr key={idx}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>owner</td>
                <td>farmer</td>
                <td>
                  <p>Order Date: {timeConverter(item[6])}</p>
                  <p>Delivery Date: {timeConverter(item[7])}</p>
                  <p>Status: {item[9]}</p>
                  <p>
                    {parseInt(Number(item[3]), 16) === 0
                      ? 'Waiting request'
                      : 'Farmer request to get an order '}
                  </p>
                </td>
                <td>
                  <p>{item[5]}</p>
                  <p>Seed Name</p>
                  <p>Sowing Date</p>
                  <p>Harvest Date</p>
                  <p>Crop info</p>
                </td>
                <td>
                  {userInfo?.role === 'farmer' &&
                    parseInt(Number(item[3]), 16) === 0 && (
                      <button onClick={() => handleOnGetAOrder(item[0])}>
                        Get this order
                      </button>
                    )}
                  {userInfo?.role === 'coopmart' &&
                    parseInt(Number(item[3]), 16) !== 0 && (
                      <button
                        onClick={() => handleOnAcceptFarmer(item[0], true)}
                      >
                        Accept this order
                      </button>
                    )}
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
