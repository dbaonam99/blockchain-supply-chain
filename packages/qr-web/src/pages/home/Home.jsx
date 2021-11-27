import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useGetOrdersQuery } from '../../queries/order';
import { web3 } from '../../queries/web3';
import { timeConverter } from '../../utils/time';
import styles from './Home.module.css';

function Home({ location, history }) {
  const { data: orders } = useGetOrdersQuery();

  const getUserByAddress = (address) => {
    // console.log(address);
    // const res = await UserService.getUserInfoByAddress({
    //   address,
    // });
    return 'zxc';
  };

  if (location.pathname === '/') {
    history.push('/orders');
  }

  console.log(orders);
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
          </tr>
          {orders?.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item[1]}</td>
              <td>owner</td>
              <td>farmer</td>
              <td>
                <p>Order Date: {timeConverter(item[6])}</p>
                <p>Delivery Date: {timeConverter(item[7])}</p>
                <p>Status: {web3.utils.toAscii(item[8])}</p>
                <p>{item[4] ? 'Farmer Accepted' : 'Waiting Acceptance'}</p>
              </td>
              <td>
                <p>{item[5]}</p>
                <p>Seed Name</p>
                <p>Sowing Date</p>
                <p>Harvest Date</p>
                <p>Crop info</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default Home;
