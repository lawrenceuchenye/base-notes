import { create } from "zustand";

const useStore = create((set) => ({
  isConnected: false,
  smartContract:null,
  account:null,
  totalNotes:0,
  addNoteStatus:false,
  toggleIsConnected:()=> set((state)=>({ isConnected:!state.isConnected })),
  setSmartContract:(smartContract,account)=> set((state)=>({ smartContract:smartContract,account:account})),
  setNotesTotalNumber:(totalNotes)=> set((state)=>({ totalNotes:totalNotes })),
  setAddNoteStatus:(isAddNoteActive)=>set((state)=>({ addNoteStatus:isAddNoteActive}))
}));

export default useStore;