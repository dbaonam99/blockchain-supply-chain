import { web3 } from './web3';
import ContractAbi from 'contracts/Contract.abi';

export const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const contract = new web3.eth.Contract(ContractAbi, CONTRACT_ADDRESS);
