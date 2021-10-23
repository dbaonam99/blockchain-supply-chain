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
    });

    it('Should farmer take an order', async function () {
      await supplyChainContract.connect(addr1).farmerTakeOrder(1);
    });

    // it('Should accept farmer to take an order', async function () {
    //   await supplyChainContract.acceptFarmer(1, true);
    // });

    // it('Should get an Order detail', async function () {
    //   // await supplyChainContract.getOrderDetail(1);
    //   console.log(await supplyChainContract.getOrderDetail(1));
    // });

    // it('Should farmer update crop information', async function () {
    //   await supplyChainContract.connect(addr1).farmerTakeOrder(1);
    // });
  });
});
