import React from "react";
import { useEffect, useState ,useContext} from "react";
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

  const id = getId();
  const [noteData, setNoteData] = useState({ title: "", description: "" });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/note/getnote/${id}`
        );
        const data = response.data.data;
        setNoteData({ title: data.title, description: data.description });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [id]);

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
