import { useState } from "react";
import { motion } from "framer-motion";
import { rand } from "../../Utils";
import "./index.css";

import { stripHtml } from "string-strip-html";
import parse from 'html-react-parser';

import useStore from "../../../notestore";
import { useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const index=({id,content,notes,setNotes})=>{
    const [cardColors,setCardColor]=useState(["--color-sky","--color-green","--color-emerald","--color-rose","--color-red","--color-amber","--color-orange","color-pink"]);
    const [color,setColor]=useState(cardColors[rand(0,cardColors.length-2)]);
    const [isDeleteTriggered,setIsDeleteTriggered]=useState(false);

    const contract=useStore((state)=> state.smartContract);
    const account=useStore((state)=>state.account);
    const setNotesTotalNumber=useStore((state)=>state.setNotesTotalNumber);
    const setViewNoteStatus=useStore((state)=>state.setViewNoteStatus);
    const setActiveNote=useStore((state)=> state.setActiveNote);
    const totalNotesNumber=useStore((state)=>state.totalNotes);
    

   
    
    const animControl=useAnimationControls();

    const delCard=async (cardId)=>{
        setIsDeleteTriggered(true);
        if(!isDeleteTriggered){
            try{
              await contract.methods.deleteNote(cardId).send({from:account[0]});
            }catch(err){
                setIsDeleteTriggered(false);
                return;
            }
            await animControl.start({ opacity:0,scale:[1.3,1],transition:{type:"spring",duration:0.8}});
            setNotes(notes.filter((note)=> note.id != cardId));
            setNotesTotalNumber(totalNotesNumber-1);
        }
        
     }

     useEffect(()=>{

     },[isDeleteTriggered]);

    return(
        <motion.div  whileHover={{ scale:1.1}} transition={{  type:"spring",stiffness:200}}  animate={animControl} className="noteContainer" style={{ background:`var(${color})`}}>
           <div style={{height:"230px",overflow:"hidden"}} onClick={()=> { setViewNoteStatus(true); setActiveNote({id:id,content:content}) }}>
                <p>{parse(content.slice(0,120))}</p>
            </div>
            <div className="trashIcon">
            <motion.i onClick={()=>delCard(id)} whileTap={{ scale:1.3}} style={{"opacity":isDeleteTriggered && "0.5"}} className="fa fa-trash"></motion.i>
            </div>
            <div className="baseIcon">
                <div className="iconDash" style={{ background:`var(${color}`}}></div>
            </div>
        </motion.div>
    );
}

export default index;