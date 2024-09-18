
import './App.css';
import 'react-quill/dist/quill.snow.css';

import Navbar from "../components/NavBar";
import NoteView from "../components/NoteView";
import AddNote from "../components/AddNote";

import useStore from '../notestore';

function App() {

  const addNoteStatus=useStore((state)=>state.addNoteStatus);
  const setAddNoteStatus=useStore((state)=>state.setAddNoteStatus);

  return (
    <div>
      <Navbar />
      <NoteView /> 
      <div className="footer">
             <hr />
             <p>Made with <i className="fa fa-heart"></i> by @warpghost from @baseafrica</p>
        </div>  
        { addNoteStatus && <AddNote /> }
    </div>
  );
}

export default App;
