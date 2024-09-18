import { create } from "zustand";

const useStore = create((set) => ({
  isConnected: false,
  smartContract:null,
  account:null,
  totalNotes:0,
  addNoteStatus:false,
  viewNoteStatus:false,
  activeNote:null,
  setActiveNote:(activeNote)=>set((state)=> ({ activeNote:activeNote})),
  toggleIsConnected:()=> set((state)=>({ isConnected:!state.isConnected })),
  setSmartContract:(smartContract,account)=> set((state)=>({ smartContract:smartContract,account:account})),
  setNotesTotalNumber:(totalNotes)=> set((state)=>({ totalNotes:totalNotes })),
  setAddNoteStatus:(isAddNoteActive)=>set((state)=>({ addNoteStatus:isAddNoteActive})),
  setViewNoteStatus:(viewNoteStatus)=>set((state)=>({ viewNoteStatus:viewNoteStatus }))
}));

export default useStore;