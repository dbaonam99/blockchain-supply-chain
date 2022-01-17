import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrdersQuery } from '../../queries/order';
import { web3 } from '../../queries/web3';
import { timeConverter } from '../../utils/time';
import './CheckOrder.css';

function CheckOrder() {
  const { id } = useParams();
  const { data: orders } = useGetOrdersQuery();
  const [order, setOrder] = useState();

  useEffect(() => {
    if (!orders) return;
    const { address } = web3.eth.accounts.privateKeyToAccount(id);
    const publicKey = parseInt(address.toString(16), 16);

    console.log(address, publicKey);

    const _orders = orders.filter(
      (item) =>
        item[8] === 'STATUS_PUBLISHED' && parseInt(item[13]) === publicKey
    );
    setOrder(_orders[0]);
  }, [id, orders]);

  return (
    <div className="login">
      <div className="login__background" />
      <div className="login__box">
        <form className="login__box__right">
          <h2 style={{ textAlign: 'center' }}>Order Information</h2>
          {order && (
            <div style={{ width: '100%', padding: '0 20px' }}>
              <p>ID: {order[0]}</p>
              <p>Name: {order[1]}</p>
              <p>Amount: {order[5]}</p>
              <p>Order: {timeConverter(order[6])}</p>
              <p>Delivery: {timeConverter(order[7])}</p>
              <p>Seed Name: {order[9]}</p>
              <p>Sowing: {timeConverter(order[10])}</p>
              <p>Harvest: {timeConverter(order[11])}</p>
              <p>Crop Information: </p>
              {order[12].length > 0 && (
                <table className="table tableSmall">
                  <tbody>
                    <tr>
                      <th>Time</th>
                      <th>Detail</th>
                    </tr>
                    {order[12].map((item) => (
                      <tr key={item[0]}>
                        <td>{timeConverter(item[0])}</td>
                        <td>
                          <p>Fertilizer: {item[1]}</p>
                          <p>Pesticides: {item[2]}</p>
                          <p>Watering: {item[3]}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CheckOrder;
