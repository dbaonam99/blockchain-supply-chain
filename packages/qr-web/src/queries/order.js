import { useMutation, useQuery } from 'react-query';
import { CONTRACT_ADDRESS, contract } from './contracts';
import { toast } from 'react-toastify';
import { send } from './utils.js';
import { useAuth } from '../auth/account';

export const useCreateOrderMutation = () => {
  const { account } = useAuth();

  return useMutation(
    async ({ productName, amount, deliveryDate }) => {
      await send(
        account,
        CONTRACT_ADDRESS,
        contract.methods.createOrder(
          productName,
          Number(amount),
          Number(deliveryDate)
        )
      );
      return 'Order created!';
    },
    {
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },

      onSuccess: (data) => {
        toast.success(data);
      },
    }
  );
};

export const useGetOrdersQuery = () => {
  return useQuery('orders', async () => {
    return await contract.methods.getOrders().call();
  });
};
