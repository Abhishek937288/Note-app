import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Note.css";
import axios from "axios";
import { UserContext } from "../../context/noteContex";

const getId = () => {
  const { id } = useParams();
  return id;
};

const Note = () => {
  const { refresh } = useContext(UserContext);
  const [noteData, setNoteData] = useState({ title: "", description: "" });
  const id = getId();

  useEffect(() => {
    const fetchData = async () => {
      if (!id || id === ":id") {
        setNoteData({ title: "", description: "" });
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/note/getnote/${id}`,
          { withCredentials: true }
        );
        const data = response.data.data;
        setNoteData({ title: data.title, description: data.description });
      } catch (err) {
        console.log("Error fetching note:", err.message);
      }
    };

    fetchData();
  }, [id, refresh]);

  return (
    <div className="noteContainer">
      <div className="mainNote">
        {!noteData.title ? (
          <>
            <h1>no data</h1>
          </>
        ) : (
          <>
            {" "}
            <h1>{noteData.title}</h1>
            <p>{noteData.description}</p>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Note;
