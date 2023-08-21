import React, { useState } from 'react'
import { axiosInstance } from '../axios.util';

export default function NoteModal() {

    const initialForm = {
        Title: "",
        Description: "",
    }

    const [form, setForm] = useState({ ...initialForm });

    const handleTextChange = (value, key) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    const handleSaveClick = async (event) => {
        event.preventDefault();
        if (form.Title.trim() === "" || form.Description.trim() === "") {
            alert("Please enter")
            return;
        }
        try {
            const { data } = await axiosInstance.post(`/Notes/Note`, {
                Title: form.Title,
                Description: form.Description
            })
            alert("Başarılı")
        } catch (error) {
            alert("Not Kaydedilemedi")
        }
    }

    return (
        <div className='NoteModalDiv'>
            <form>
                <input
                    type='text'
                    placeholder='Note Title'
                    value={form.Title}
                    onChange={(e) => handleTextChange(e.target.value, "Title")}
                    className='NoteModalInput'
                />
                <input
                    type='text'
                    placeholder='Note Description'
                    value={form.Description}
                    onChange={(e) => handleTextChange(e.target.value, "Description")}
                    className='NoteModalInput'
                />
                <button className='NoteModalButton' onClick={handleSaveClick}>Save</button>
            </form>
        </div>
    )
}
