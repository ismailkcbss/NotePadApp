import alertify from 'alertifyjs'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios.util'
import Loading from '../Loading'

export default function Home() {
    const [panelData, setPanelData] = useState([])
    const [loading, setLoading] = useState(false)

    const GetPanel = async () => {
        try {
            const { data } = await axiosInstance.get(`/Panel/Content`)
            setPanelData(data)
            setLoading(true);
        } catch (error) {
            alertify.error(error.response.data.error);
        }
    }

    useEffect(() => {
        GetPanel();
    }, [])


    return (
        <div>
            {loading ? (
                <div className='HomeContainer'>
                    <div className='HomeHeader'>
                        <h1>{panelData.panel[0].TopTitle}</h1>
                        <p>{panelData.panel[0].TopDesc}</p>
                    </div>
                    <div className='HomeBody'>
                        <h3>{panelData.panel[0].MidTitle}</h3>
                        <p>&emsp;{panelData.panel[0].MidDesc}</p>
                    </div>
                    <div className='HomeBottom'>
                        <h3>{panelData.panel[0].BotTitle}</h3>
                        <p>&emsp;{panelData.panel[0].BotDesc}</p>
                    </div>
                </div>
            ) : (
                <Loading />
            )

            }
        </div>
    )
}
