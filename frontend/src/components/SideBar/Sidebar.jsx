import React, { useEffect, useState, useContext } from "react";
import "./sideBar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/noteContex";

const Sidebar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setIsForm, setFormMode, refresh, setRefresh, setFormData, setId } =
    useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/note/noteData",
          { withCredentials: true }
        );
        const data = response.data;
        if (data.success == false) {
          setData([]);
        } else {
          setData(data.data);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const handleAddClick = () => {
    setIsForm(true);
    setFormMode("add");
  };

  const handleEditClick = async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api/note/getnote/${id}`,
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
        `http://localhost:8080/api/note/deletenote/${id}`,{withCredentials:true}
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
