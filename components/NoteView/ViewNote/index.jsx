import "./index.css";
import { rand } from "../../Utils";
import { motion,useAnimationControls} from "framer-motion";
import { useState,useEffect } from "react";
import useStore from "../../../notestore";
import { toast } from "react-toastify";

const index=({ noteVal })=>{
    const [cardColors,setCardColor]=useState(["--color-sky","--color-green","--color-emerald","--color-rose","--color-red","--color-amber","--color-orange","color-pink"]);
    const [color,setColor]=useState(cardColors[rand(0,cardColors.length-2)]);
    const [value, setValue] = useState(noteVal);
    const [animFinished,setAnimFinished]=useState(false);
    const setViewNoteStatus=useStore((state)=>state.setViewNoteStatus);

    const controls = useAnimationControls();
    const animChain=async ()=>{
        await controls.start({ y:"0",opacity:1});
        await controls.start({ width:"70%",height:"85%",borderRadius:"15px",left:"15%",top:"10%"});
        setAnimFinished(true);
    }
    
    const delCard=async (cardId)=>{
        console.log(cardId);
        await contract.methods.deleteNote(cardId).send({from:account[0]});
        await controls.start({ opacity:0});
        await controls.start({y:"300px",width:"8%",height:"16%"});
        setNotes(notes.filter((note)=> note.id != cardId));
        setNotesTotalNumber(totalNotesNumber-1);
        
     }

    useEffect(()=>{
       animChain();
    },[]);



    return(
        <motion.div transition={{ type:"spring",stiffness:100,duration:0.3}} style={{background:`var(${color})`}} initial={{ opacity:0,width:"8%",height:"16%",y:"300px",borderRadius:"50%"}} animate={controls} className="addNoteContainer">
           {animFinished && (
            <div className="btnsContainer">
                <motion.div onClick={async ()=>{  
                setAnimFinished(false);
                   await controls.start({ opacity:0});
                   await controls.start({y:"300px",width:"8%",height:"16%"});
                   setViewNoteStatus(false); setValue("");
                  }}
                className="ds-btn" whileTap={{ scale:1.2}} initial={{ opacity:0}} animate={{ opacity:1,transition:{type:"spring",stiffness:80,duration:0.4}}}><h1>Delete <i className="fa fa-trash"></i></h1></motion.div>
                <motion.div onClick={async ()=>  {  setAnimFinished(false);
                   await controls.start({ opacity:0});
                   await controls.start({y:"300px",width:"8%",height:"16%"});
                   setViewNoteStatus(false); setValue("");
               }} className="s-btn" whileTap={{ scale:1.2 }} initial={{ opacity:0}} animate={{ opacity:1,transition:{type:"spring",stiffness:80,duration:0.4,delay:0.2}}}><h1>Close <i class="fas fa-window-close"></i> </h1></motion.div>
            </div>
           )}
        </motion.div>
    )
}

export default index;