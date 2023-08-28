import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { usePosition } from 'use-position';

export default function LocationWeather() {

    const [weather, setWather] = useState();
    const { latitude, longitude } = usePosition();
    const [check, setCheck] = useState(false)


    const getWatherData = async (lat, lon) => {
        try {
            const key = process.env.REACT_APP_WEATHER_API_KEY
            const lang = navigator.language;
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=metric`);
            setWather(data);
            setCheck(true)
        } catch (error) {
            alert("Veri alınırken hata oluştu");
        }
    }

    useEffect(() => {
        latitude && longitude && getWatherData(latitude, longitude);
    }, [latitude, longitude])


    return (
        <div>
            {
                check ? (
                    <div className='WeatherDiv'>
                        <p className='UserInfoP'>
                            <span>Location:</span><span className='UserInfoSp'>{weather.name}</span>
                        </p>
                        <p className='UserInfoP'>
                            <span>Temp:</span><span className='UserInfoSp'>{weather.main.temp}°C</span>
                        </p>
                        <p className='UserInfoP'>
                            <span>Temp Desc:</span><span className='UserInfoSp'>{weather.weather.map(data => data.description).join(", ")}</span>
                        </p>
                        <p className='UserInfoP'>
                            <span>Date:</span><span className='UserInfoSp'>{new Date(weather.dt * 1000).toLocaleDateString()}</span>
                        </p>
                    </div>) : (
                    <p>Konum Bilgisi Yükleniyor...</p>
                )
            }
        </div>
    )
}
