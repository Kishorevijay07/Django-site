import React from 'react'
import { useState,useEffect} from 'react'
import api from '../api'
import Note from './Note'
import Loadingspinner from '../components/Loadingspinner'
const Home = () => {

    const [notes,setnotes]=useState([])
    const [title,setTitle]=useState('')
    const [content,setcontent]=useState('')

    useEffect(() => {
        getnotes()
    },[]);

    const getnotes = async () => {
        api
            .get('/api/notes/')
            .then((res)=>res.data)
            .then((data)=>{setnotes(data) ; console.log("Data Form DB " , data)})
            .catch((err)=>console.error(err))
    }
        const deleteNote = async (id) => {
            await api
                .delete(`/api/notes/delete/${id}/`) // Added trailing slash here
                .then((res) => {
                    console.log(res.status);
                    if (res.status === 200 || res.status === 204) alert("Note Deleted");
                    else alert("Error Deleting Note");
                })
                .catch((err) => console.error(err));
            getnotes();
        };

const createNote = async (e) => {
    e.preventDefault();
    console.log("Creating Note with title:", title, "and content:", content);

    try {
        const res = await api.post('/api/notes/', { title, content });
        if (res.status === 201) {
            alert('Note Created Successfully');
            setTitle('');
            setcontent('');
            getnotes(); // call only after successful creation
        } else {
            alert('Failed to create note');
        }
    } catch (err) {
        if (err.response) {
            console.error("Error details:", err.response.data);
            alert(JSON.stringify(err.response.data));
        } else {
            console.error(err);
        }
    }
};

console.log("Notes from DB", notes)

    return (
    <div>
        <h2>Notes</h2>
        <div>
            
           {notes.map((note)=>(
            <Note note={note} ondelete={deleteNote} key={note.id}/>
           ))} 
        </div>
        <h2>Create a Note</h2>    
        <div>
            <form onSubmit={createNote}>
                <label>Title</label>
                <input
                    type='text'
                    placeholder='Title'
                    required
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                />
                <label>Content</label>
                <textarea
                    input="text"
                    placeholder='Content'
                    required
                    onChange={(e)=>setcontent(e.target.value)}
                    value={content}
                />
                <input type="submit" value="submit"></input>
            </form>
        </div>
    </div>
  )
}
export default Home