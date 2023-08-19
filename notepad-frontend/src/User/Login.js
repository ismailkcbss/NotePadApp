import React, { useEffect, useState } from 'react'
import { axiosInstance, setApiToken } from '../axios.util';
import * as storage from '../storage.helper'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { userActions } from '../redux/slice/userSlice';

export default function Login() {

    const initialForm = {
        Email: "",
        Password: "",
    }

    const [form, setForm] = useState({ ...initialForm });
    const [userData, setUserData] = useState({})

    const history = useHistory();
    const dispatch = useDispatch();


    const handleTextChange = (value, key) => {
        setForm({
            ...form,
            [key]: value,
        })
    }



    const AuthenticationLogin = async (event) => {

        event.preventDefault();
        if (form.Email.trim() === "" || form.Password.trim() === "") {
            alert("Please Check Your Information ")
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
            console.log(data);
            history.push('/Dashboard');
        } catch (error) {
            alert("Could not login");
        }
        setForm({ ...initialForm });
    }


    const handleRegisterClick = () => {
        history.push('/Register');
    }
    const handlePasswordClick = () => {

    }

    return (
        <div className='LoginDiv'>
            <h3>Please Enter Your Information </h3>
            <form>
                <div className='loginForm'>
                    <input
                        type='text'
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
