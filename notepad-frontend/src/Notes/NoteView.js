import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../axios.util';
import { useHistory } from 'react-router-dom';

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
    try {
      const { data } = await axiosInstance.get(`/Notes/Note/${id}`);
      setForm({
        Title: data.note.Title,
        Description: data.note.Description,
      })
    } catch (error) {
      alert("Not Getirilemedi")
    }
  }


  const handleSaveClick = async (event) => {
    event.preventDefault();
    if (form.Title.trim() === "" || form.Description.trim() === "") {
      alert("Bilgileri Doldurun")
      return
    }
    try {
      const { data } = await axiosInstance.put(`/Notes/Note/${id}`, {
        Title: form.Title,
        Description: form.Description
      })
      alert('başarılı')
      history.push('/Dashboard')
    } catch (error) {
      alert("Not Kaydedilmedi")
      console.log(error);
    }
  }


  const handleDeleteClick = async () => {
    try {
      const { data } = await axiosInstance.delete(`/Notes/Note/${id}`)
      alert('The Note Was Successfully Deleted')
      history.push('/Dashboard')
    } catch (error) {
      alert("The Note Was Failed Deleted")
      console.log(error);
    }
  }

  useEffect(() => {
    GetSingleNote();
  }, [id])
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
        <button className='NoteViewUpButton' onClick={handleSaveClick}>Update</button>
        <button className='NoteViewDelButton' onClick={handleDeleteClick}>Delete</button>
      </div>



    </div>
  )
}
