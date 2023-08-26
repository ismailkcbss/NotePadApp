import React, { useState } from 'react'
import alertify from 'alertifyjs'
import { axiosInstance } from '../axios.util';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useHistory } from 'react-router-dom';

export default function PasswordReset() {
  const initialForm = {
    Email: ""
  }
  const [form, setForm] = useState({ ...initialForm });

  const history = useHistory();
  const handleChangeText = (value, key) => {
    setForm({
      ...form,
      [key]: value
    });
  }
  alertify.set('notifier', 'delay', 4); // alert mesajı süresi
  const handleClickSend = async (event) => {
    event.preventDefault();
    if (form.Email.trim() === "") {
      alertify.error("Missing Information")
      return;
    }
    try {
      const { data } = await axiosInstance.post(`/Users/PasswordReset`, {
        Email: form.Email
      })
      alertify.success("Sent to E-Mail")
    } catch (error) {
      alertify.error(error.response.data.error)
    }
  }
  const handleClickReturn = () => {
    history.push('/')
  }
  return (
    <div className='PasswordResetDiv'>
      <div className='FormDivHeader'>
        <button onClick={handleClickReturn}><ChevronLeftIcon sx={{ fontSize: '2em' }} /></button> <h3>Enter the registered email address</h3>
      </div>
      <form>
        <div className='PasswordResetForm'>
          <input
            type='email'
            placeholder='Email Gir'
            value={form.Email}
            onChange={(e) => handleChangeText(e.target.value, "Email")}
            required
            autoFocus
            className='PasswordResetInput'
          />
          <button className='PasswordResetButton' onClick={handleClickSend}>Send</button>
        </div>
      </form>
    </div>
  )
}
