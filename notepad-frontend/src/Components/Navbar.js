import React from 'react'
import * as storage from '../storage.helper'
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie'; // Frontend tarafından cookie işlemleri için kullandığımız paket 
import { userActions } from '../redux/slice/userSlice';
import { useDispatch } from 'react-redux';


export default function Navbarr() {

    const token = storage.getValueByKey("jwt");
    const history = useHistory();
    const dispatch = useDispatch();

    const RemoveCookie = (jwt) => { // cookieyi silme fonksiyınu
        Cookie.remove(jwt)
    }

    const handleSendMail = () => {
        history.push('/Contact')
    }

    const handleDashboard = () => {
        history.push('/Dashboard')
    }

    const handleLogin = () => {
        history.push('/')
    }

    const handleRegister = () => {
        history.push('/Register')
    }
    const handleClickLogout = () => {
        dispatch(userActions.logout());
        storage.setKeyWithValue("jwt", ""); // Logout tusuna basınca storage den cookie yi siler
        RemoveCookie('jwt'); // Logout tuşuna basınca cookiyi siler.
        history.push('/');
    }

    return (
        <div className='NavbarDiv'>
            {
                token ? (
                    <div className='NavbarButtonDiv'>
                            <button className='NavbarButton' onClick={handleDashboard}>Dashboard</button>
                            <button className='NavbarButton'  onClick={handleSendMail}>Contact</button>
                            <button className='NavbarButton'  onClick={handleClickLogout}>Logout</button>
                    </div>
                ) : (
                    <div className='NavbarButtonDiv'>
                        <button className='NavbarButton'  onClick={handleLogin}>Login</button>
                        <button className='NavbarButton'  onClick={handleRegister}>Register</button>
                    </div>
                )
            }

        </div>
    )
}
