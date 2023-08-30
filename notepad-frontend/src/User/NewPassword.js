import React, { useEffect, useState } from 'react';
import alertify from 'alertifyjs';
import { axiosInstance } from '../axios.util';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';


export default function NewPassword() {

    const initialForm = {
        NewPassword: "",
        NewPassword2: "",
    }
    const [form, setForm] = useState({ ...initialForm });
    const history = useHistory();


    const GetCookie = (pres) => {
        return Cookie.get(pres);
    };

    const id = GetCookie('pres')


    const handleTextChange = (value, key) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    const handleClickUpdate = async (event) => {
        event.preventDefault();
        if (form.NewPassword.trim() === "" || form.NewPassword2.trim() === "") {
            alertify.error("Bilgileri Doldurun");
            return;
        }
        if (form.NewPassword === form.NewPassword2) {
            try {
                const { data } = await axiosInstance.post(`/Users/NewPassword/${id}`, {
                    NewPassword: form.NewPassword
                })
                history.push('/NewPassDesc')
                alertify.success("Parola değişim başarılı");
            } catch (error) {
                alertify.error(error);
            }
        } else {
            alertify.error("Girilen Parolalar aynı değil")
        }

    }

    useEffect(() => {
        GetCookie();
    }, [])
    return (
        <div className='NewPasswordDiv'>
                <h3>Enter Your New Password !</h3>
            <form>
                <div className='NewPasswordForm'>
                    <input
                        type='password'
                        placeholder='parola girin'
                        value={form.NewPassword}
                        onChange={(e) => handleTextChange(e.target.value, "NewPassword")}
                        required
                        autoFocus
                        className='NewPasswordInput'
                    />
                    <input
                        type='password'
                        placeholder='parola tekrar girin'
                        value={form.NewPassword2}
                        onChange={(e) => handleTextChange(e.target.value, "NewPassword2")}
                        required
                        className='NewPasswordInput'
                    />
                    <button className='NewPasswordButton' onClick={handleClickUpdate}>Update</button>
                </div>
            </form>
        </div>
    )
}
