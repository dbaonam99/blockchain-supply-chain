import React, { createContext, useContext, useEffect, useState } from 'react';
import { web3 } from '../queries/web3';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState();
  const [account, setAccount] = useState();

  const getUserInfo = (data) => {
    setUserInfo(data);
  };

  useEffect(() => {
    if (!userInfo) return;
    if (!userInfo.privateKey) return;
    (async () => {
      const account = web3.eth.accounts.privateKeyToAccount(
        userInfo?.privateKey
      );
      console.log('address', { ...account, ...userInfo });
      setAccount({ ...account, ...userInfo });
    })();
  }, [userInfo]);

  return (
    <AuthContext.Provider value={{ userInfo, getUserInfo, account }}>
      {props.children}
    </AuthContext.Provider>
  );
};
