import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Note.css";
import axios from "axios";
import { UserContext } from "../../context/noteContex";

const Note = () => {
  const { id } = useParams();

  const { refresh } = useContext(UserContext);
  const [noteData, setNoteData] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchData = async () => {
      if (!id || id === ":id" || id === "random") {
        setNoteData({ title: "", description: "" });

        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/note/getnote/${id}`,
          { withCredentials: true }
        );

        if (response.data.status === 404) {
          setNoteData({
            title: "this is note not available select another one ",
            description: "",
          });
        }
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
