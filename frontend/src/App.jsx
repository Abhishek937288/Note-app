import {Route,Routes} from "react-router-dom";
import './App.css'
import Navbar from './components/NavBar/Navbar';
import Home from './pages/Home/Home';
import About from "./pages/About/About"
import Dashboard from "./pages/Dashboard/Dashboard";

import Signin from "./pages/Signin/Signin";

function App() {
  

  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/about" element={<About/>}/>       
        <Route path="/notes/:id" element={<Dashboard/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
     </div>
  )
}

export default App;
