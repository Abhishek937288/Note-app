import React from 'react'
import { useParams } from "react-router-dom";

const Note = () => {
    const { id } = useParams()
  return (
    <div>Notes:{id}</div>
  )
}

export default Note;