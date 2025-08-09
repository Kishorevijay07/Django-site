import React from "react";

const Note = ({ note, ondelete }) => {
  const formatDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note-container">
      <h2>Note Page</h2>
      <h1 className="note-title">{note.title}</h1>
      <p className="note-content">{note.content}</p>
      <p className="note-date">Created on: {formatDate}</p>
      <button className="delete-button" onClick={() => ondelete(note.id)}>
        Delete Note
      </button>
    </div>
  );
};
export default Note;
