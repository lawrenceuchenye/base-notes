
import './App.css';
import 'react-quill/dist/quill.snow.css';

import Navbar from "../components/NavBar";
import NoteView from "../components/NoteView";
import AddNote from "../components/AddNote";
import ViewNote from "../components/NoteView/ViewNote";

import useStore from '../notestore';

function App() {

  const addNoteStatus=useStore((state)=>state.addNoteStatus);
  const setAddNoteStatus=useStore((state)=>state.setAddNoteStatus);

  const viewNoteStatus=useStore((state)=>state.viewNoteStatus);
 

  return (
    <div>
      <Navbar />
      <NoteView /> 
      <div className="footer">
             <hr />
             <p>Made with <i className="fa fa-heart"></i> by @wt from @baa</p>
        </div>  
        { addNoteStatus && <AddNote /> }
        { viewNoteStatus && <ViewNote />}
    </div>
  );
}

export default App;
