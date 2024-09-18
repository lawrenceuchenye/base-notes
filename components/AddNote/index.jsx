import "./index.css";
import { rand } from "../Utils";
import { motion,useAnimationControls} from "framer-motion";
import { useState,useEffect } from "react";
import ReactQuill from 'react-quill';
import useStore from "../../notestore";
import { toast } from "react-toastify";

const index=()=>{
    const [cardColors,setCardColor]=useState(["--color-sky","--color-green","--color-emerald","--color-rose","--color-red","--color-amber","--color-orange","color-pink"]);
    const [color,setColor]=useState(cardColors[rand(0,cardColors.length-2)]);
    const [value, setValue] = useState('');
    const [animFinished,setAnimFinished]=useState(false);
    const setAddNoteStatus=useStore((state)=>state.setAddNoteStatus);
    const contract=useStore((state)=>state.smartContract);
    const account=useStore((state)=>state.account);

    const controls = useAnimationControls();
    const animChain=async ()=>{
        await controls.start({ y:"0",opacity:1});
        await controls.start({ width:"70%",height:"85%",borderRadius:"15px",left:"15%",top:"10%"});
        setAnimFinished(true);
    }
    
    useEffect(()=>{
       animChain();
    },[]);

    const addNoteToBlockchain=async (content)=>{
        if(value.length < 1){
            controls.start({
                rotate: [-4, 3, -3, 2, -2, 1, -1, 0,3,-1,2,-2,3,0],
                transition: {
                  duration: 0.3,
                  type: "spring",
                  damping: 10,
                },
              });
              toast.warn("please write a note");
              return;
        }

        await contract.methods.addNote(content).send({from:account[0]});
        setAnimFinished(false);
        await controls.start({ opacity:0});
        await controls.start({y:"300px",width:"8%",height:"16%"});
        setAddNoteStatus(false);
        toast.success("Note added successfully");

    }

    return(
        <motion.div transition={{ type:"spring",stiffness:100,duration:0.3}} style={{background:`var(${color})`}} initial={{ opacity:0,width:"8%",height:"16%",y:"300px",borderRadius:"50%"}} animate={controls} className="addNoteContainer">
           {animFinished && <ReactQuill  style={{border:"none"}} theme="snow" value={value} onChange={setValue} />}

           {animFinished && (
            <div className="btnsContainer">
                <motion.div onClick={async ()=>{  
                    setAnimFinished(false);
                   await controls.start({ opacity:0});
                   await controls.start({y:"300px",width:"8%",height:"16%"});
                   setAddNoteStatus(false); 
                   setValue("");
                  }}
                className="ds-btn" whileTap={{ scale:1.2}} initial={{ opacity:0}} animate={{ opacity:1,transition:{type:"spring",stiffness:80,duration:0.4}}}><h1>Discard <i className="fa fa-trash"></i></h1></motion.div>
                <motion.div onClick={()=> addNoteToBlockchain(value)} className="s-btn" whileTap={{ scale:1.2 }} initial={{ opacity:0}} animate={{ opacity:1,transition:{type:"spring",stiffness:80,duration:0.4,delay:0.2}}}><h1>Save <i className="fa fa-save"></i></h1></motion.div>
            </div>
           )}
        </motion.div>
    )
}

export default index;