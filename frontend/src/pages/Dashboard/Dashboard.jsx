import React, { useState,useContext} from "react";
import "./Dashboard.css";
import Sidebar from "../../components/SideBar/Sidebar";
import Form from "../../components/Form/Form";
import Note from "../../components/Note/Note";
import { UserContext } from "../../context/noteContex";

const Dashboard = () => {
 const{isForm , setIsform}=useContext(UserContext);
  return (
    <div className="mainContainer">
      <div className="sideBar">
        <Sidebar />
      </div>
      <div className="rightSide">{isForm ? <Form /> : <Note/>}</div>
    </div>
  );
};

export default Dashboard;
