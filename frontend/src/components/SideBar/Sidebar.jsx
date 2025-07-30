import React, { useEffect, useState, useContext } from "react";
import "./sidebar.css";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/noteContex";
import { toast } from "react-toastify";
 
const backendUrl = import.meta.env.VITE_BACKEND_URL ;

const Sidebar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setIsForm, setFormMode, refresh, setRefresh, setFormData, setId,id } =
    useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
            `${backendUrl}/note/noteData`,
          { withCredentials: true }
        );
    
        const data = response.data;
        if (data.success === false) {
          setData([]);
         setError("unauthorized");
        } else {
          setData(data.data);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
    setError("unauthorized");
  }
      }
    };
    fetchData();
  }, [id,refresh]);

  useEffect(()=>{
  if(error === "unauthorized"){
     toast.error("Please signIn or signUp");
    navigate("/signin");
  }
  },[error,navigate]);

  const handleAddClick = () => {
    setIsForm(true);
    setFormMode("add");
  };

  const handleEditClick = async (id) => {
    const response = await axios.get(
      `${backendUrl}/note/getnote/${id}`,
      { withCredentials: true }
    );
    const data = response.data.data;
    setFormData({ title: data.title, description: data.description });
    setIsForm(true);
    setFormMode("edit");
    setId(id);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/note/deletenote/${id}`,
        { withCredentials: true }
      );
      const data = response.data;
      setRefresh(!refresh);   
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="sidebarContainer">
      <div className="header">
        <p>All Notes</p>
        <button className="addBtn" onClick={handleAddClick}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
      <hr />
      <div className="sideBarMainContent">
        {data.map((note) => {
          return (
            <div className="sideBarNote" key={note._id}>
              <Link to={`/notes/${note._id}`} className="SideBarLink">
                {note.title}
              </Link>
              <div className="sideBarNoteBtns">
                <button onClick={() => handleEditClick(note._id)}>
                  <span className="material-symbols-outlined">
                    edit_document
                  </span>
                </button>
                <button onClick={() => handleDeleteClick(note._id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
