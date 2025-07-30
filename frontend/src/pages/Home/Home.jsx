import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate();
  return (
    <>
      <div className="homeContainer">
        <h4>Tame your work, organize your life <br />Best Note Taking App</h4>
        <p>Capture your note, files and life' work all in one secure place</p>
        <button onClick={()=>{
          navigate("/notes/:id");
        }}>Get Started for free</button>
      </div>
    </>
  );
};

export default Home;
