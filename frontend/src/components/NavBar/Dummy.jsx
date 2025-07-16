import React from 'react'
import { Link } from 'react-router-dom';
import "./dummy.css";
const dummyData = [
  { id: 1, title: "Learn JavaScript" },
  { id: 2, title: "Build a React App" },
  { id: 3, title: "Explore Node.js" },
  { id: 4, title: "Master MongoDB" },
  { id: 5, title: "Create MERN Project" }
];


const Dummy = () => {
  return (
    <div className='link'>
        {dummyData.map((note)=>
            <Link key={note.id} to={`/notes/${note.id}`} >{note.title}</Link>
        )}
    </div>
  )}


export default Dummy;