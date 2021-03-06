//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

contract SupplyChainContract {

  using Counters for Counters.Counter;
  Counters.Counter private _orderIds;

  mapping(uint256 => Order) public idToOrder;

  struct CropInformation {
    uint256 cropCareDate;
    string fertilizer;
    string pesticides;
    string watering;
  }

  struct Order {
    uint256 orderId;
    string productName;
    address owner;
    address farmer;
    bool isFarmerAccepted;
    uint256 amount;
    uint256 orderDate;
    uint256 deliveryDate;
    string status;

    string seedName;
    uint256 sowingDate;
    uint256 harvestDate;

    CropInformation[] cropInformation;
    address publicKey;
  }

  function createOrder(
    string memory productName,
    uint256 amount,
    uint256 deliveryDate
  ) public {
    _orderIds.increment();
    uint256 orderId = _orderIds.current();

    Order storage order = idToOrder[orderId];
    order.orderId = orderId;
    order.productName = productName;
    order.owner = msg.sender;
    order.farmer = address(0);
    order.isFarmerAccepted = false;
    order.amount = amount;
    order.orderDate = block.timestamp;
    order.deliveryDate = deliveryDate;
    order.status = 'STATUS_CREATED';
  }

  function getOrders() public view returns (Order[] memory) {
    uint orderCount = _orderIds.current();
    uint currentIndex = 0;

    Order[] memory orders = new Order[](orderCount);
    for (uint i = 0; i < orderCount; i++) {
      uint currentId = i + 1;
      Order storage currentOrder = idToOrder[currentId];
      orders[currentIndex] = currentOrder;
      currentIndex += 1;
    }
    return orders;
  }

  function getOrderDetail(uint256 orderId) public view returns (Order memory) {
    return idToOrder[orderId];
  }

  function farmerTakeOrder(string memory role, uint256 orderId ) public {
    require(keccak256(abi.encode(idToOrder[orderId].status)) == keccak256(abi.encode("STATUS_CREATED")), "Order is producing");
    require(keccak256(abi.encode(role)) == keccak256(abi.encode("farmer")), "You are not a farmer");
    idToOrder[orderId].farmer = msg.sender;
  }

  function acceptFarmer(uint256 orderId, bool isAccept) public {
    require(idToOrder[orderId].farmer != address(0), "Order do not have any farmer");
    require(idToOrder[orderId].owner == msg.sender, "You can not accept this Order");
    idToOrder[orderId].isFarmerAccepted = isAccept;
    idToOrder[orderId].status = "STATUS_PRODUCING";
  }

  function farmerUpdateOrderInformation(
    uint256 orderId, 
    string memory seedName,
    uint256 sowingDate
  ) public {
    require(keccak256(abi.encode(idToOrder[orderId].status)) == keccak256(abi.encode("STATUS_PRODUCING")), "Order is not producing");
    require(idToOrder[orderId].farmer == msg.sender, "Order is not yours");
    require(idToOrder[orderId].isFarmerAccepted == true, "You are not accpeted for this Order");
    idToOrder[orderId].seedName = seedName;
    idToOrder[orderId].sowingDate = sowingDate;
  }

  function farmerUpdateCropInformation(
    uint256 orderId, 
    string memory fertilizer, 
    string memory pesticides,
    string memory watering
  ) public {
    require(keccak256(abi.encode(idToOrder[orderId].status)) == keccak256(abi.encode("STATUS_PRODUCING")), "Order is not producing");
    require(idToOrder[orderId].farmer == msg.sender, "Order is not yours");
    require(idToOrder[orderId].isFarmerAccepted == true, "You are not accpeted for this Order");
    Order storage order = idToOrder[orderId];

    order.cropInformation.push(CropInformation({
      cropCareDate: block.timestamp,
      fertilizer: fertilizer,
      pesticides: pesticides,
      watering: watering
    }));
  }

  function markAsHarvested(
    uint256 orderId
  ) public {
    require(idToOrder[orderId].farmer == msg.sender, "Order is not yours");
    require(keccak256(abi.encode(idToOrder[orderId].status)) == keccak256(abi.encode("STATUS_PRODUCING")), "Order is not producing");
    idToOrder[orderId].status = "STATUS_HARVESTED";
    idToOrder[orderId].harvestDate = block.timestamp;
  }

  function verifyOrder(
    uint256 orderId
  ) public {
    require(keccak256(abi.encode(idToOrder[orderId].status)) == keccak256(abi.encode("STATUS_HARVESTED")), "Order is not harvest yet");
    require(idToOrder[orderId].owner == msg.sender, "You can not verify this Order");
    idToOrder[orderId].status = "STATUS_VERIFIED";
  }

  function deleteOrder(
    uint256 orderId
  ) public {
    require(idToOrder[orderId].owner == msg.sender, "You can not delete this Order");
    idToOrder[orderId].status = "STATUS_DELETED";
  }

  function publishOrder(
    uint256 orderId,
    address publicKey
  ) public {
    require(keccak256(abi.encode(idToOrder[orderId].status)) != keccak256(abi.encode("STATUS_PUBLISHED")), "Order is published");
    require(idToOrder[orderId].owner == msg.sender, "You can not publish this Order");
    idToOrder[orderId].publicKey = publicKey;
    idToOrder[orderId].status = "STATUS_PUBLISHED";
  }
}
