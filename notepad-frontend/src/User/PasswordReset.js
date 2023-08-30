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
    history.push('/Login')
  }
  return (
    <div className='PasswordResetDiv'>

      <div style={{marginBottom:"3em" ,width:"100%",height:"auto",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/notepadapp-96bda.appspot.com/o/PassReset.png?alt=media&token=835aba3c-432b-4e5d-916f-a115a358010c"
          alt="Register Success"
          style={{ width: "20em" }}
        />
        <h1>If You Want to Reset Your Password.</h1>
        <h4>Type the registered mailing address in the field below. Let's send a reset message to your mailbox.</h4>
      </div>

      <div className='FormDivHeader'>
        <button onClick={handleClickReturn}><ChevronLeftIcon sx={{ fontSize: '2em' }} /></button> <h4>Enter the registered email address</h4>
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
