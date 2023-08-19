import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { userActions } from '../redux/slice/userSlice';
import * as storage from '../storage.helper'


export default function Navbar() {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const history = useHistory();

    const handleClickLogin = () => {
        history.push('/Login')
    }
    const handleClickRegister = () => {
        history.push('/Register')
    }
    const handleClickDashboard = () => {
        history.push('/Dashboard')
    }
    const handleClickLogout = () => {
        dispatch(userActions.logout());
        storage.setKeyWithValue("jwt", "");
        
        history.push('/');
    }
    return (
        <div className='NavbarDiv'>
            {user.isAuth ? (
                <div>
                    <button className='NavbarClickButton' onClick={handleClickDashboard}>Dashboard</button>
                    <button className='NavbarClickButton' onClick={handleClickLogout}>Logout</button>
                </div>

            ) : (
                <div>
                    <button className='NavbarClickButton' onClick={handleClickLogin}>Login</button>
                    <button className='NavbarClickButton' onClick={handleClickRegister}>Register</button>
                </div>
            )}
        </div>
    )
}
