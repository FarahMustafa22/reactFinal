import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [color, setColor] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      body,
      color,
      createdAt: new Date().toLocaleString()
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setBody('');
    setColor('');
    setShowAddNote(false); 
  };

  const removeNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const editNote = (id) => {
    const noteToEdit = notes.find(note => note.id === id);
    setTitle(noteToEdit.title);
    setBody(noteToEdit.body);
    setColor(noteToEdit.color);
    setEditingNoteId(id);
    setShowAddNote(true); 
  };

  const saveEditedNote = () => {
    const editedNotes = notes.map(note => {
      if (note.id === editingNoteId) {
        return {
          ...note,
          title,
          body,
          color
        };
      }
      return note;
    });
    setNotes(editedNotes);
    setTitle('');
    setBody('');
    setColor('');
    setEditingNoteId(null);
    setShowAddNote(false); 
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Farah's Notes App</h1>
      <div className="notes-container">
        {notes.map(note => (
          <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <p>Created At: {note.createdAt}</p>
            <button onClick={() => removeNote(note.id)}>Remove</button>
            <button onClick={() => editNote(note.id)}>Edit</button>
          </div>
        ))}
        {showAddNote && (
          <div className="note" style={{ backgroundColor: color }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
            />
            {editingNoteId ? (
              <button onClick={saveEditedNote} style={{ marginRight: '5px' }}>Save</button>
            ) : (
              <button onClick={addNote} style={{ marginRight: '5px' }}>Add Note</button>
            )}
            <button onClick={() => setShowAddNote(false)}>Cancel</button>
          </div>
        )}
        <div className="add-note" onClick={() => setShowAddNote(!showAddNote)}>
          +
        </div>
      </div>
    </div>
  );
}

export default App;
