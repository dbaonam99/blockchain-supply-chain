import ContractAbi from '../contracts/Contract.abi';
import { web3 } from './web3';

export const CONTRACT_ADDRESS = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';

export const contract = new web3.eth.Contract(ContractAbi, CONTRACT_ADDRESS);
