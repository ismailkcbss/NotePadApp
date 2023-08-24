import React, { useState } from 'react'
import { axiosInstance } from '../axios.util';
import { useHistory } from 'react-router-dom';

export default function NoteAddModal(props) {

    const { setVisited } = props;

    const characterLimit = 2000;

    const history = useHistory();

    const initialForm = {
        Title: "",
        Description: "",
    }

    const [form, setForm] = useState({ ...initialForm });

    const handleTextChange = (value, key) => {
        if (characterLimit - value.length >= 0)
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
            alert("Başarılı");
            setVisited(false);
            window.location.reload()
        } catch (error) {
            alert("Not Kaydedilemedi")
            console.log(error);
        }

        setForm({ ...initialForm })
    }

    const HandleCloseClick = () => {
        setVisited(false);
        window.location.reload() // Modal kapanınca sayfayı refresh eder
    }

    return (
        <div className='NoteModalDiv'>
            <div className='NoteModalTitleDiv'>
                <span>Please Enter Your Note</span>
                <button className='CloseModalButton' onClick={HandleCloseClick}>X</button>
            </div>
            <form>
                <input
                    type='text'
                    placeholder='Note Title'
                    value={form.Title}
                    onChange={(e) => handleTextChange(e.target.value, "Title")}
                    className='NoteModalInput'
                    maxLength={100}
                />
                <textarea
                    rows={9}
                    cols={57.5}
                    placeholder='Note Description'
                    value={form.Description}
                    onChange={(e) => handleTextChange(e.target.value, "Description")}
                    maxLength={2000}
                />
                <small style={{ fontSize: ".8em", marginRight: "4em" }}>{characterLimit - form.Description.length} Remaining</small>
                <button className='NoteModalButton' onClick={handleSaveClick}>Save</button>
            </form>
        </div>
    )
}
