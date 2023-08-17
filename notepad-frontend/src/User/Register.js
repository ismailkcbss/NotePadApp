import React, { useState } from 'react'
import { axiosInstance } from '../axios.util'
import { useHistory } from 'react-router-dom';

export default function Register() {

  const initialForm = {
    FullName: "",
    Email: "",
    Password: "",
    Phone: "",
  }

  const [form, setForm] = useState({ ...initialForm });

  const history = useHistory();

  const handleTextChange = (value, key) => {
    setForm({
      ...form,
      [key]: value,
    })
  }

  const handleClickRegistration = async (event) => {
    event.preventDefault();
    if (form.FullName.trim() === "" || form.Email.trim() === "" || form.Password.trim() === "" || form.Phone.trim() === "") {
      alert("Please Fill in the Missing Information")
      return;
    }
    try {
      const { data } = await axiosInstance.post(`/auth/register`, {
        FullName: form.FullName,
        Email: form.Email,
        Password: form.Password,
        Phone: form.Phone,
      })
      alert("Registration Success")
      history.push('/Login');
    } catch (error) {
      alert("Hatalı giris");
    }

    setForm({ ...initialForm })
  }

  return (
    <div className='RegisterDiv'>
      <h3>Please Enter Your Information</h3>
      <form>
        <div className='RegisterForm'>
          <input
            type='text'
            placeholder='Full Name'
            value={form.FullName}
            onChange={(e) => handleTextChange(e.target.value, "FullName")}
            className='RegisterInput'
            required
          />
          <input
            type='text'
            placeholder='Email Address'
            value={form.Email}
            onChange={(e) => handleTextChange(e.target.value, "Email")}
            className='RegisterInput'
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={form.Password}
            onChange={(e) => handleTextChange(e.target.value, "Password")}
            className='RegisterInput'
            required
          />
          <input
            type='number'
            placeholder='Phone'
            value={form.Phone}
            onChange={(e) => handleTextChange(e.target.value, "Phone")}
            className='RegisterInput'
            required
          />
          <button className='RegisterButton' onClick={handleClickRegistration}>Register</button>
        </div>
      </form>
    </div>
  )
}
