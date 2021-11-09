import React from 'react';
import styles from './ContentTypeBody.module.css';

function ContentTypeBody() {
  return (
    <div className={styles.contentType}>
      <div className={styles.heading}>
        <p>Danh sách đơn hàng</p>
        <div className={styles.addBtn}>Thêm</div>
      </div>
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
    </div>
  );
}

ContentTypeBody.propTypes = {
  // data: PropTypes.array,
};

export default ContentTypeBody;
