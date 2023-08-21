import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { userActions } from '../redux/slice/userSlice';
import LocationWeather from './LocationWeather';
import * as storage from '../storage.helper'
import Cookie from 'js-cookie'; // Frontend tarafından cookie işlemleri için kullandığımız paket 



export default function Navbar(props) {

    const { userData, token } = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const RemoveCookie = (jwt) => { // cookieyi silme fonksiyınu
        Cookie.remove(jwt)
    }

    const handleClickLogout = () => {
        dispatch(userActions.logout());
        storage.setKeyWithValue("jwt", ""); // Logout tusuna basınca storage den cookie yi siler
        RemoveCookie('jwt'); // Logout tuşuna basınca cookiyi siler.
        history.push('/');
    }

    return (
        <div className='NavbarDiv'>
            {token ? (
                <div>
                    <div className="ImageDiv">
                        <img src={userData.Image} alt="ProfilIMG" />
                    </div>
                    <div className="UserInfo">
                        <p><span>Name:</span> <span className='weatInf'>{userData.FullName}</span></p>
                        <p><span>Email:</span> <span className='weatInf'>{userData.Email}</span></p>
                        <p><span>Phone:</span> <span className='weatInf'>{userData.Phone}</span></p>
                        <LocationWeather />
                    </div>
                    <div className='UserButton'>
                        <button className='NavbarClickButton' onClick={handleClickLogout}>Logout</button>
                    </div>
                </div>

            ) : (
                ""
            )}
        </div>
    )
}
