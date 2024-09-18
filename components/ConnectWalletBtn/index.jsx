
import "./index.css";
import { useState,useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { motion  } from "framer-motion";
import useStore from "../../notestore";
import { InitContractConnection } from "../Utils";

const index=()=>{
    
    const [account,setAccount]=useState(null);
    const isConnected=useStore((state)=>state.isConnected);
    const toggleIsConnected=useStore((state)=>state.toggleIsConnected);
    const setSmartContract=useStore((state)=>state.setSmartContract);

    const connectWallet=async()=>{
        if(window.ethereum){
            console.log(window.ethereum.networkVersion, 'window.ethereum.networkVersion');
            if(window.ethereum.networkVersion != 84532){
                toast.error("Switch to the Base Sepolia Eth network");
                return
            }

            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts);
                toggleIsConnected();
               
            }catch(error){
               toast.error("Failed Sign-in Attempt.");
               console.log(error);
            }
        }else{
            toast.warn("Ensure you have the metamask browser extension installed.");
        }
    }

    useEffect(()=>{
        setSmartContract(InitContractConnection(),account);
    },[account]);
    
    return(
        <motion.div whileTap={{ scale:1.2 }} onClick={connectWallet} className={ isConnected ? "connectedWallet" : "connectWallet" }>
            <h1>{ isConnected ? `${account[0].slice(0,8)}....${account[0].slice(37)}` : "CONNECT WALLET" }</h1>
        </motion.div>
    );
}

export default index;