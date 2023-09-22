import React, { useState } from 'react'
import { axiosInstance, setApiToken } from '../axios.util';
import * as storage from '../storage.helper'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { userActions } from '../redux/slice/userSlice';
import alertify from 'alertifyjs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Login() {
    
    const initialForm = {
        Email: "",
        Password: "",
    }

    const [form, setForm] = useState({ ...initialForm });

    const history = useHistory();
    const dispatch = useDispatch();


    const handleTextChange = (value, key) => {
        setForm({
            ...form,
            [key]: value,
        })
    }

    const handleClickReturn = () => {
        history.push('/')
    }
    const handleRegisterClick = () => {
        history.push('/Register');
    }
    const handlePasswordClick = () => {
        history.push('/PasswordReset');
    }

    const AuthenticationLogin = async (event) => {
        event.preventDefault();
        if (form.Email.trim() === "" || form.Password.trim() === "") {
            alertify.error("Bilgilerinizi Eksiksiz Girin");
            return;
        }
        try {
            const { data } = await axiosInstance.post(`/Users/Login`, {
                Email: form.Email,
                Password: form.Password,
            })
            storage.setKeyWithValue("jwt", data.token);
            setApiToken(data.token);
            dispatch(userActions.login(data))
            history.push('/');
            alertify.success("Giriş Başarılı");
        } catch (error) {
            alertify.error(error.response.data.error);
        }
        setForm({ ...initialForm });
    }

    return (
        <div className='LoginDiv'>
            <div className='FormDivHeader'>
                <button onClick={handleClickReturn}><ChevronLeftIcon sx={{ fontSize: '2em' }} /></button> <h3>Please Enter Your Information</h3>
            </div>
            <form>
                <div className='loginForm'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        value={form.Email}
                        onChange={(e) => handleTextChange(e.target.value, "Email")}
                        className='LoginInput'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={form.Password}
                        onChange={(e) => handleTextChange(e.target.value, "Password")}
                        className='LoginInput'
                    />
                    <button className='LoginButton' onClick={AuthenticationLogin}>Login</button>

                    <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                        <span>To Register <button className='LoginRegForButton' onClick={handleRegisterClick}>Click Here</button></span>
                        <span>Forgot Your Password <button className='LoginRegForButton' onClick={handlePasswordClick}>Click Here</button></span>
                    </div>
                </div>
            </form>
        </div>

    )
}
