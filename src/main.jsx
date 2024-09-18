import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
    <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&family=Reenie+Beanie&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hanunoo&family=Yellowtail&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Monoton&family=Sevillana&display=swap');

</style>
   
    <App />
    <ToastContainer />
  </StrictMode>,
)
