import "./index.css";
import { toast } from 'react-toastify';
import ConnectWalletBtn from "../ConnectWalletBtn";
import AddNoteBtn from "../AddNoteBtn";
import useStore  from "../../notestore";
import { motion,motionValue,useTransform,animate } from "framer-motion";
import { useEffect } from "react";


 const index=()=>{
   const isConnected=useStore((state)=>state.isConnected);
   const account=useStore((state)=>state.account);
   const totalNotesNum=useStore((state)=>state.totalNotes);
   const notesNum=motionValue(0);
   const rounded=useTransform(notesNum,latest => Math.round(latest));
   const addNoteStatus=useStore((state)=>state.addNoteStatus);
  
   useEffect(() => {
      
      const controls = animate(notesNum, totalNotesNum,{duration:0.5});
      
      return () => controls.stop()
    }, [account,totalNotesNum,addNoteStatus]);

    return(
        <div className="navContainer">
           <div className="logoContainer">
            <motion.span initial={{ y:"100px",opacity:0}} animate={{ y:0,opacity:1}} transition={{ stiffness:800,type:"spring",duration:3}}>Base</motion.span><span>Notes</span>
           </div>

           <div>
            { isConnected && (<div>
            <motion.span className="notes-count">{rounded}</motion.span>
            </div>)}
            { isConnected && <AddNoteBtn />}
            <ConnectWalletBtn />
           </div>
        </div>
    );
 }

 export default index;