import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../axios.util';
import { useHistory } from 'react-router-dom';
import alertify from 'alertifyjs'

export default function NoteView() {

  const initialForm = {
    Title: "",
    Description: "",
  }
  const characterLimit = 2000;
  const history = useHistory();
  const { id } = useParams();
  const [form, setForm] = useState({ ...initialForm })


  const handleChangeText = (value, key) => {
    if (characterLimit - value.length >= 0)
      setForm({
        ...form,
        [key]: value,
      })
  }

  const GetSingleNote = async () => {
    if (id) {
      try {
        const { data } = await axiosInstance.get(`/Notes/Note/${id}`);
        setForm({
          Title: data.note.Title,
          Description: data.note.Description,
        })
        alertify.success("Success");
      } catch (error) {
        alertify.error("Your Note  Not Found");
      }
    }
  }

  const handleSaveClick = () => {
    if (!id) {
      handleNewNoteClick();
    } else {
      handleUpNoteClick();
    }
  }

  const handleNewNoteClick = async () => {
    if (form.Title.trim() === "" || form.Description.trim() === "") {
      alertify.error("Please Fill in the Missing Information");
      return;
    }
    try {
      const { data } = await axiosInstance.post(`/Notes/Note`, {
        Title: form.Title,
        Description: form.Description
      })
      history.push('/Dashboard')
      alertify.success("Note Added");
    } catch (error) {
      alertify.error("Note Not  Added");
    }

    setForm({ ...initialForm })
  }

  const handleUpNoteClick = async () => {
    if (form.Title.trim() === "" || form.Description.trim() === "") {
      alertify.error("Please Fill in the Missing Information");
      return
    }
    try {
      const { data } = await axiosInstance.put(`/Notes/Note/${id}`, {
        Title: form.Title,
        Description: form.Description
      })
      history.push('/Dashboard')
      alertify.success("Your Note Updated");
    } catch (error) {
      alertify.error("Your Note Not  Updated");
    }
    setForm({ ...initialForm })
  }


  const handleDeleteClick = async () => {
    try {
      const { data } = await axiosInstance.delete(`/Notes/Note/${id}`)
      alert('The Note Was Successfully Deleted')
      history.push('/Dashboard')
    } catch (error) {
      alert("The Note Was Failed Deleted")
    }
  }

  useEffect(() => {
    GetSingleNote();
  }, [])

  return (
    <div className='NoteViewDiv'>
      <form>
        <div className='NoteViewForm'>
          <input
            type='text'
            placeholder='Note Title'
            value={form.Title}
            onChange={(e) => handleChangeText(e.target.value, "Title")}
            className='NoteViewInput'
            maxLength={100}
          />
          <textarea
            rows={12}
            cols={56}
            placeholder='Note Description'
            value={form.Description}
            onChange={(e) => handleChangeText(e.target.value, "Description")}
            maxLength={2000}
            min={0}
          />
          <small style={{ float: "left", fontSize: ".8em", margin: "0 4em 2em 0" }}>{characterLimit - form.Description.length} Remaining</small>
        </div>
      </form>
      <div className='NoteViewButtonDiv'>
        {
          id ? (
            <div>
              <button className='NoteViewUpButton' onClick={handleSaveClick}>Update</button>
              <button className='NoteViewDelButton' onClick={handleDeleteClick}>Delete</button>
            </div>
          ) : (
            <button className='NoteViewNewSaveButton' onClick={handleSaveClick}>Save</button>
          )
        }

      </div>



    </div>
  )
}
