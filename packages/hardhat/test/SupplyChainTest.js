const { ethers } = require('hardhat');
const { use } = require('chai');
const { solidity } = require('ethereum-waffle');

use(solidity);

describe('SupplyChain', function () {
  describe('Create a Order', function () {
    let supplyChainContract;
    let owner;
    let addr1;

    beforeEach(async function () {
      [owner, addr1] = await ethers.getSigners();
    });

    it('Should deploy SupplyChain contract', async function () {
      const SupplyChainContract = await ethers.getContractFactory(
        'SupplyChainContract'
      );

      supplyChainContract = await SupplyChainContract.deploy();
    });

    it('Should create an Order', async function () {
      await supplyChainContract.createOrder('Rau sạch', 1000, 1000, {
        from: owner.address,
      });
      await supplyChainContract.createOrder('Rau sạch 2', 1000, 1000, {
        from: owner.address,
      });
    });

    it('Should farmer take an order', async function () {
      await supplyChainContract.connect(addr1).farmerTakeOrder(1);
    });

    it('Should accept farmer to take an order', async function () {
      await supplyChainContract.acceptFarmer(1, true);
    });

    it('Should farmer update order information', async function () {
      await supplyChainContract
        .connect(addr1)
        .farmerUpdateOrderInformation(1, 'seed', 123123123);
    });

    it('Should farmer update crop information', async function () {
      await supplyChainContract
        .connect(addr1)
        .farmerUpdateCropInformation(1, 'fertilizer', 'pesticides', 'watering');
    });

    it('Should farmer mark as harvested', async function () {
      await supplyChainContract.connect(addr1).markAsHarvested(1);
    });

    it('Should verify an Order', async function () {
      await supplyChainContract.connect(owner).verifyOrder(1);
    });

    it('Should get an Order detail', async function () {
      await supplyChainContract.getOrderDetail(1);
    });

    it('Should get an all Orders', async function () {
      console.log(await supplyChainContract.getOrders());
    });
  });
});
