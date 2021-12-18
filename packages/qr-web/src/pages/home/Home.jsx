import React from 'react';
import { useAuth } from '../../auth/account';
import AdminLayout from '../../Layouts/AdminLayout';
import { useGetAnOrderMutation, useGetOrdersQuery } from '../../queries/order';
import { timeConverter } from '../../utils/time';
import styles from './Home.module.css';

function Home({ location, history }) {
  const { data: orders } = useGetOrdersQuery();
  const { userInfo } = useAuth();
  const getAnOrder = useGetAnOrderMutation();

  const getUserByAddress = (address) => {
    // console.log(address);
    // const res = await UserService.getUserInfoByAddress({
    //   address,
    // });
    return 'zxc';
  };

  const handleOnGetAOrder = () => {
    getAnOrder.mutate({
      role: userInfo.role,
      orderId: '0x1',
    });
  };

  if (location.pathname === '/') {
    history.push('/orders');
  }

  return (
    <AdminLayout buttonType="add" title="Orders" userInfo={userInfo}>
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
                <td>{idx + 1}</td>
                <td>{item[1]}</td>
                <td>owner</td>
                <td>farmer</td>
                <td>
                  <p>Order Date: {timeConverter(item[6])}</p>
                  <p>Delivery Date: {timeConverter(item[7])}</p>
                  <p>Status: {item[9]}</p>
                  <p>{item[4] ? 'Farmer Accepted' : 'Waiting Acceptance'}</p>
                </td>
                <td>
                  <p>{item[5]}</p>
                  <p>Seed Name</p>
                  <p>Sowing Date</p>
                  <p>Harvest Date</p>
                  <p>Crop info</p>
                </td>
                <td>
                  <button onClick={handleOnGetAOrder}>Get this order</button>
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
