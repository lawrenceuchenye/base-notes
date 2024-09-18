import "./index.css";
import useStore from "../../notestore";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import { AcceleratedAnimation } from "framer-motion";
import Note from "./Note";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/navigation";

// import required modules
import { Pagination,Navigation } from 'swiper/modules';
import { ConnectionNotOpenError } from "web3";

const index=()=>{
    const isConnected=useStore((state)=>state.isConnected);
    const contract=useStore((state)=>state.smartContract);
    const account=useStore((state)=>state.account);
    const setNotesTotalNumber=useStore((state)=>state.setNotesTotalNumber);

    const [notes,setNotes]=useState(null);
    const [slidingWindow,setSlidingWindow]=useState(0);

    const [colorArray,setColorArray]=useState([]);

    const getNotes=async ()=>{
        if(account[0]){
         try{
             const fetchedNotes=await contract.methods.getNotes(account[0]).call({from:account[0]});
             const cleanedNotes=[...fetchedNotes].map((note)=>{ return { id:parseInt(String(note["id"])),content:note["content"]}}).filter((note)=>note.content != "");
             setNotes(cleanedNotes)
             setNotesTotalNumber(cleanedNotes.length);
           
             console.log(notes);
         }catch(err){
            console.log(err);
         }
          }

    }

    useEffect(()=>{   
        getNotes();
        setColorArray([]);
        setSlidingWindow(0);
      
    },[account]);

    useEffect(()=>{
        console.log(slidingWindow);
    },[slidingWindow]);

    return(
        <div className="mainNoteContainer">
            {!notes ? (
                isConnected ? (
                <div className="noNotesContainer">
                    <i class="fa-solid fa-box-open"></i><br />
                    <span>Quite spacey add a note...</span>
                </div>
                ):(
                <div className="noNotesContainer">
                    <i class="fa-solid fa-box"></i><br />
                    <span>Connect your wallet to view notes.</span>
                </div>
                )
            ) :(
                isConnected  && notes.length > 0 ? (
                    <Swiper
                    slidesPerView={4}
                    spaceBetween={25}
                    pagination={{
                      clickable: true,
                      dynamicBullets:true
                    }}
                    navigation={{
                        nextEl: ".slider-arrow-r",
                        prevEl: ".slider-arrow-l",
                        clickable: true,
                      }}

                    modules={[Pagination,Navigation]}

                    className="mySwiper"
                    style={{ height:"400px",width:"100%"}}
                  >
                <div className="notesContainer">
       
                    {notes.map((note)=>{
                        return <SwiperSlide><Note colorArray={colorArray} content={note.content} id={note.id} key={note.id} notes={notes} setNotes={setNotes}/></SwiperSlide>
                    })}
                     
                </div>
                </Swiper>
              
                ):(
                    <div className="noNotesContainer">
                    <i class="fa-solid fa-box-open"></i><br />
                    <span>Quite spacey add a note...</span>
                </div>
                )
            )}
            { isConnected && (<div>
                <div className="notesNav slider-controler">
                      <motion.div whileTap={{ scale:1.2 }} className="leftNav slider-arrow-l" onClick={()=> slidingWindow > 0 ? setSlidingWindow(slidingWindow-1) : setSlidingWindow(0)}>
                        <div className="iconDash" style={{ background:`var(${colorArray[slidingWindow]})`}}></div>
                    </motion.div>
                    <motion.div whileTap={{ scale:1.2 }} className="rightNav slider-arrow-r"  onClick={()=> 
                        slidingWindow < 4 ? setSlidingWindow(slidingWindow+1) : setSlidingWindow(slidingWindow) }>
                        <div className="iconDash" style={{ background:`var(${ account ? colorArray[(slidingWindow+3)] : "--color-slate-dark"})`}}></div>
                    </motion.div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>)}
        </div>
    );
}

export default index;