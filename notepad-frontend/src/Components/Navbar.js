import React from 'react'
import { useHistory } from 'react-router-dom'



export default function Navbar() {

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
    return (
        <div className='NavbarDiv'>
            <button className='NavbarClickButton' onClick={handleClickLogin}>Login</button>
            <button className='NavbarClickButton' onClick={handleClickRegister}>Register</button>
            <button className='NavbarClickButton' onClick={handleClickDashboard}>Dashboard</button>
        </div>
    )
}
