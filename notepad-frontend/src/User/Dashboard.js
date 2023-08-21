import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import NotePaper from '../Notes/NotePaper';
import { axiosInstance } from '../axios.util';
import Loading from '../Loading';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/slice/userSlice';
import * as storage from '../storage.helper'
import NoteModal from '../Notes/NoteModal';
import { useHistory } from 'react-router-dom';

export default function Dashboard() {

  const token = storage.getValueByKey("jwt");

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState("");
  const [note, setNote] = useState([])
  const [visited, setVisited] = useState(false)


  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get('/Users/UserMe')
      setUserData(data.user)
      setIsLoading(true);
      dispatch(userActions.set(data.user))
    } catch (error) {
      alert(error)
    }
  }

  const getAllNotes = async () => {
    try {
      const { data } = await axiosInstance.get(`/Notes/Note`)
      setNote(data.notes)
    } catch (error) {
      alert("Error Notes")
    }
  }

  const handleAddNoteClick = () => {
    setVisited(true)
  }


  useEffect(() => {
    getUser();
    getAllNotes();
  }, [])

  return (
    <div>
      {
        isLoading ? (
          <div className="DashboardDiv">
            {
              visited ? (
                <div className='DashboardModal'>
                  <NoteModal setVisited={setVisited} />
                </div>
              ) : (
                ""
              )
            }
            <div className="UserContainer">
              <Navbar userData={userData} token={token} />
            </div>
            <div className="NotePadContainer">
              <div className="AddNewNoteDiv">
                <h3>NotePad Application</h3>
                <button onClick={handleAddNoteClick}>Add New Note</button>
              </div>
              <hr />
              <div className="NotesDiv">
                <NotePaper note={note} setVisited={setVisited} />
              </div>
            </div>
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
