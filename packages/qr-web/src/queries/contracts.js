import ContractAbi from '../contracts/Contract.abi';
import { web3 } from './web3';

export const CONTRACT_ADDRESS = '0x9A676e781A523b5d0C0e43731313A708CB607508';

export const contract = new web3.eth.Contract(ContractAbi, CONTRACT_ADDRESS);
