import { Web3 } from "web3";
import contractABI from "./CONTRACT_ABI.json";

export const rand=(min,max)=>{
    return Math.floor(Math.random() * (max-min+1) + min);
}

const contractAddress="0xcBDd3733702f2E96E50Fec7E1B04079B53DFBEb0";

export const InitContractConnection=()=>{
    let web3=new Web3(window.ethereum);
    const contract=new web3.eth.Contract(contractABI,contractAddress);
    return contract;
}