module.exports = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isAccept',
        type: 'bool',
      },
    ],
    name: 'acceptFarmer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'productName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deliveryDate',
        type: 'uint256',
      },
    ],
    name: 'createOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'role',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256',
      },
    ],
    name: 'farmerTakeOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'fertilizer',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'pesticides',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'watering',
        type: 'string',
      },
    ],
    name: 'farmerUpdateCropInformation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'seedName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'sowingDate',
        type: 'uint256',
      },
    ],
    name: 'farmerUpdateOrderInformation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256',
      },
    ],
    name: 'getOrderDetail',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'productName',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'farmer',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'isFarmerAccepted',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'orderDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deliveryDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'status',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'seedName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'sowingDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'harvestDate',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cropCareDate',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'fertilizer',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'pesticides',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'watering',
                type: 'string',
              },
            ],
            internalType: 'struct SupplyChainContract.CropInformation[]',
            name: 'cropInformation',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct SupplyChainContract.Order',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOrders',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'productName',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'farmer',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'isFarmerAccepted',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'orderDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deliveryDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'status',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'seedName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'sowingDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'harvestDate',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cropCareDate',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'fertilizer',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'pesticides',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'watering',
                type: 'string',
              },
            ],
            internalType: 'struct SupplyChainContract.CropInformation[]',
            name: 'cropInformation',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct SupplyChainContract.Order[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'idToOrder',
    outputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'productName',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'farmer',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'isFarmerAccepted',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'orderDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deliveryDate',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'status',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'seedName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'sowingDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'harvestDate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256',
      },
    ],
    name: 'markAsHarvested',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderId',
        type: 'uint256',
      },
    ],
    name: 'verifyOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
