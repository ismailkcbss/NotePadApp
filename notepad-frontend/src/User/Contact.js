import React, { useState } from 'react'
import { axiosInstance } from '../axios.util';
import alertify from 'alertifyjs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Contact() {

    const initialForm = {
        FullName: "",
        Email: "",
        Description: "",
    }
    const characterLimit = 2000;
    const [form, setForm] = useState({ ...initialForm });
    const history = useHistory();

    const handleTextChange = (value, key) => {
        if (characterLimit - value.length >= 0)
            setForm({
                ...form,
                [key]: value
            })
    }
    const handleSendClick = async (event) => {
        event.preventDefault();
        if (form.FullName.trim() === "" || form.Email.trim() === "" || form.Description.trim() === "") {
            alertify.warning("Please enter")
            return;
        }
        try {
            const { data } = await axiosInstance.post(`/Users/Contact`, {
                FullName: form.FullName,
                Email: form.Email,
                Description: form.Description
            })
            alertify.success("Başarılı")
            history.push('/Dashboard')
            setTimeout(() => {
                setForm({ ...initialForm })
            }, 4000);
        } catch (error) {
            alertify.error(error)
        }
    }
    const handleClickReturn = () => {
        history.push('/Dashboard')
    }
    return (
        <div className='ContactDiv'>
            <div className='FormDivHeader'>
                <button onClick={handleClickReturn}><ChevronLeftIcon sx={{ fontSize: '2em' }} /></button> <h3>Please Enter Your Information</h3>
            </div>
            <form>
                <div className='ContactForm'>
                    <input
                        type='text'
                        placeholder='Enter a FullName'
                        value={form.FullName}
                        onChange={(e) => handleTextChange(e.target.value, "FullName")}
                        required
                        autoFocus
                        className='ContactInput'
                    />
                    <input
                        type='email'
                        placeholder='Enter a email'
                        value={form.Email}
                        onChange={(e) => handleTextChange(e.target.value, "Email")}
                        required
                        className='ContactInput'
                    />
                    <textarea
                        rows={12}
                        cols={56}
                        placeholder='Enter a Description'
                        value={form.Description}
                        onChange={(e) => handleTextChange(e.target.value, "Description")}
                        maxLength={2000}
                        required
                    />
                    <small style={{ float: "left", fontSize: ".8em", margin: "0 4em 2em 0" }}>{characterLimit - form.Description.length} Remaining</small>
                    <button className='ContactButton' onClick={handleSendClick}>Send</button>
                </div>
            </form>
        </div>
    )
}
