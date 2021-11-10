import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import styles from './Home.module.css';

function Home({ location, history }) {
  if (location.pathname === '/') {
    history.push('/orders');
  }
  return (
    <AdminLayout buttonType="add" title="Orders">
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>asd</th>
            <th>asd</th>
            <th>asd</th>
            <th>asd</th>
          </tr>
          <tr>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
          </tr>
          <tr>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
          </tr>
          <tr>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
          </tr>
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default Home;
