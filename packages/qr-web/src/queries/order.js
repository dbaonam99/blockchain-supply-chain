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

export const useGetAnOrderMutation = () => {
  const { account } = useAuth();

  return useMutation(
    async ({ role, orderId }) => {
      await send(
        account,
        CONTRACT_ADDRESS,
        contract.methods.farmerTakeOrder(role, orderId)
      );
      return 'Get an order success!';
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

export const useAcceptFarmerMutation = () => {
  const { account } = useAuth();

  return useMutation(
    async ({ orderId, isAccept }) => {
      await send(
        account,
        CONTRACT_ADDRESS,
        contract.methods.acceptFarmer(orderId, isAccept)
      );
      return 'Order accepted!';
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

export const useUpdateOrderMutation = () => {
  const { account } = useAuth();

  return useMutation(
    async ({ orderId, seedName, sowingDate }) => {
      await send(
        account,
        CONTRACT_ADDRESS,
        contract.methods.farmerUpdateOrderInformation(
          orderId,
          seedName,
          sowingDate
        )
      );
      return 'Order updated!';
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

export const useUpdateCropMutation = () => {
  const { account } = useAuth();

  return useMutation(
    async ({ orderId, fertilizer, pesticides, watering }) => {
      await send(
        account,
        CONTRACT_ADDRESS,
        contract.methods.farmerUpdateCropInformation(
          orderId,
          fertilizer,
          pesticides,
          watering
        )
      );
      return 'Crop updated!';
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

export const useMaskAsHarvestMutation = () => {
  const { account } = useAuth();

  return useMutation(
    async ({ orderId }) => {
      await send(
        account,
        CONTRACT_ADDRESS,
        contract.methods.markAsHarvested(orderId)
      );
      return 'Crop harvested!';
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

export const useVerifyOrderMutation = () => {
  const { account } = useAuth();

  return useMutation(
    async ({ orderId }) => {
      await send(
        account,
        CONTRACT_ADDRESS,
        contract.methods.verifyOrder(orderId)
      );
      return 'Crop harvested!';
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

export const useDeleteAnOrderMutation = () => {
  const { account } = useAuth();

  return useMutation(
    async ({ orderId }) => {
      await send(
        account,
        CONTRACT_ADDRESS,
        contract.methods.deleteOrder(orderId)
      );
      return 'Order deleted!';
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

export const usePublishAnOrderMutation = () => {
  const { account } = useAuth();

  return useMutation(
    async ({ orderId, publicKey }) => {
      await send(
        account,
        CONTRACT_ADDRESS,
        contract.methods.publishOrder(orderId, publicKey)
      );
      return 'Order published!';
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
