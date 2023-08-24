import React, { useState } from 'react'
import { axiosInstance } from '../axios.util';
import alertify from 'alertifyjs';

export default function Contact() {

    const initialForm = {
        FullName: "",
        Email: "",
        Description: "",
    }

    const [form, setForm] = useState({ ...initialForm });

    const handleTextChange = (value, key) => {
        setForm({
            ...form,
            [key]: value
        })
    }
    alertify.set('notifier', 'delay', 4); // alert mesajı süresi
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

            setTimeout(() => {
                setForm({ ...initialForm })
            }, 4000);
        } catch (error) {
            alertify.error(error)
        }
    }
    return (
        <div className='ContactDiv'>
            <form>
                <input
                    type='text'
                    placeholder='Enter a FullName'
                    value={form.FullName}
                    onChange={(e) => handleTextChange(e.target.value, "FullName")}
                    required
                    autoFocus
                />
                <input
                    type='email'
                    placeholder='Enter a email'
                    value={form.Email}
                    onChange={(e) => handleTextChange(e.target.value, "Email")}
                    required
                    autoComplete
                />
                <textarea
                    rows={10}
                    cols={30}
                    placeholder='Enter a Description'
                    value={form.Description}
                    onChange={(e) => handleTextChange(e.target.value, "Description")}
                    maxLength={2000}
                    required
                />
                <button onClick={handleSendClick}>Send</button>
            </form>
        </div>
    )
}
