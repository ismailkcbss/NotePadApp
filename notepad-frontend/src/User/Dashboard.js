import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import { axiosInstance } from '../axios.util';
import Loading from '../Loading';

export default function Dashboard() {

  const [isLoading, setIsLoading] = useState(false)

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get('/Users/UserMe')
      console.log(data);
      setIsLoading(true);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    getUser();
  }, [])


  return (
    <div>
      <Navbar />
      {
        isLoading ? (
          <h1>Dashboard Sayfasına Hoşgeldiniz</h1>
        ) : (
          <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px" }}>
            <Loading />
          </div>
        )
      }


    </div>
  )
}
