import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import { axiosInstance } from '../axios.util';
import Loading from '../Loading';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/slice/userSlice';

export default function Dashboard() {

  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState("");

  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get('/Users/UserMe')
      setIsLoading(true);
      setUserData(data.user)
      dispatch(userActions.set(data.user))
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
          <div>
            <h1>Dashboard Sayfasına Hoşgeldiniz</h1>
            <p>{userData.FullName}</p>
          </div>

        ) : (
          <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px" }}>
            <Loading />
          </div>
        )
      }


    </div>
  )
}
