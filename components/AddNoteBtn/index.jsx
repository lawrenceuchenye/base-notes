import { motion } from "framer-motion";
import "./index.css";

import useStore from "../../notestore";

const index=()=>{
    const addNoteStatus=useStore((state)=>state.addNoteStatus);
    const setAddNoteStatus=useStore((state)=>state.setAddNoteStatus);
    
    return(
       <motion.div initial={{ opacity:0,y:"60px"}} animate={{ opacity:1,y:0}} transition={{ type:"spring",stiffness:1000}} className="addNoteBtn">
            <motion.i onClick={()=> setAddNoteStatus(!addNoteStatus)} whileTap={{ scale:1.2 }} className="fa-solid fa-crosshairs"></motion.i>
        </motion.div>
    );
}

export default index;