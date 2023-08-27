import React from 'react'
import LocationWeather from './LocationWeather';



export default function Navbar(props) {

    const { userData } = props;

    return (
        <div className='UserInfoDiv'>
            <div>
                <div className="ImageDiv">
                    <img src={userData.Image} alt="ProfilIMG" />
                </div>
                <div className="UserInfo">
                    <p className='UserInfoP'><span>Name:</span> <span className='UserInfoSp'>{userData.FullName}</span></p>
                    <p className='UserInfoP'><span>Email:</span> <span className='UserInfoSp'>{userData.Email}</span></p>
                    <p className='UserInfoP'><span>Phone:</span> <span className='UserInfoSp'>{userData.Phone}</span></p>
                    <LocationWeather />
                </div>
            </div>
        </div>
    )
}
