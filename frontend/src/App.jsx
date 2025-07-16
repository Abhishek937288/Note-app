import {Route,Routes} from "react-router-dom";
import './App.css'
import Navbar from './components/NavBar/Navbar';
import Home from './pages/Home/Home';
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact";
import Note from "./components/Note";
import Signin from "./pages/Signin/Signin";

function App() {
  

  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>} />
        <Route path="/notes/:id" element={<Note/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
     </div>
  )
}

export default App;
