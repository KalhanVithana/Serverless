import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HI from './hi';
import UserRoute from './routes/routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


toast.configure()
function App() {


  
  return (
    <Router>
    
     <UserRoute/>
    </Router>

  );
}

export default App;
