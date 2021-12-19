import ContractAbi from '../contracts/Contract.abi';
import { web3 } from './web3';

export const CONTRACT_ADDRESS = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

export const contract = new web3.eth.Contract(ContractAbi, CONTRACT_ADDRESS);
