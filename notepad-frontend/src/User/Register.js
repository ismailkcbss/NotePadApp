import React, { useState } from 'react'
import { axiosInstance } from '../axios.util'
import { useHistory } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../Firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import alertify from 'alertifyjs';

export default function Register() {

  const initialForm = {
    FullName: "",
    Email: "",
    Password: "",
    Phone: "",
  }
  const history = useHistory();

  const [form, setForm] = useState({ ...initialForm });
  const [image, setImage] = useState(null);

  const handleTextChange = (value, key) => {
    setForm({
      ...form,
      [key]: value,
    })
  }

  const handleClickReturn = () => {
    history.push('/')
  }

  //Firebase gönderilecek image nin url adresini takip etme
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleClickRegistration = async (event) => {
    event.preventDefault();
    if (form.FullName.trim() === "" || form.Email.trim() === "" || form.Password.trim() === "" || form.Phone.trim() === "") {
      alert("Please Fill in the Missing Information")
      return;
    }
    const imageRef = ref(storage, uuidv4());
    try {
      await uploadBytes(imageRef, image);
      const result = await getDownloadURL(imageRef);
      const { data } = await axiosInstance.post(`/Users/Register`, {
        FullName: form.FullName,
        Email: form.Email,
        Password: form.Password,
        Phone: form.Phone,
        Image: result
      })
      alert("Registration Success")
      history.push('/');
    } catch (error) {
      alert("Hatalı giris");
    }

    setForm({ ...initialForm })
  }

  return (
    <div className='RegisterDiv'>
      <div className='FormDivHeader'>
        <button onClick={handleClickReturn}><ChevronLeftIcon sx={{ fontSize: '2em' }} /></button> <h3>Please Enter Your Information</h3>
      </div>
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
          <input type="file" onChange={handleImageChange} style={{ margin: "30px" }} />
          <button className='RegisterButton' onClick={handleClickRegistration}>Register</button>
        </div>
      </form>
    </div>
  )
}
