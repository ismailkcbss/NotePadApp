import React, { useState } from 'react'
import LocationWeather from './LocationWeather';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useHistory } from 'react-router-dom';


export default function UserInfo(props) {

    const { userData } = props;
    const id = userData._id;

    const history = useHistory();

    const [value, setValue] = useState('1');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const handleEditClick = () => {
        history.push(`/EditUser/${id}`)
    }

    return (
        <div className='UserInfoDiv'>
            <div className="ImageDiv">
                <img src={userData.Image} alt="ProfilIMG" />
            </div>

            <div className="UserInfo">
                <Box sx={{ width: '100%', height: '20em', typography: 'body1', color: "black" }}>
                    <TabContext value={value} sx={{ color: 'red' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'gray' }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Profil" value="1" />
                                <Tab label="Weather Estimate" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <p className='UserInfoP'><span>Name:</span> <span className='UserInfoSp'>{userData.FullName}</span></p>
                            <p className='UserInfoP'><span>Email:</span> <span className='UserInfoSp'>{userData.Email}</span></p>
                            <p className='UserInfoP'><span>Phone:</span> <span className='UserInfoSp'>{userData.Phone}</span></p>
                            <button className='UserInfoButton' onClick={handleEditClick}>Edit Profil</button>
                        </TabPanel>
                        <TabPanel value="2">
                            <LocationWeather />
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}
