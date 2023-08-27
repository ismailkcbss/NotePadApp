import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import NotePaper from '../Notes/NotePaper';
import { axiosInstance } from '../axios.util';
import Loading from '../Loading';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/slice/userSlice';
import * as storage from '../storage.helper'
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Dashboard() {

  const token = storage.getValueByKey("jwt");

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState("");
  const [note, setNote] = useState([])
  const [page, setPage] = useState(1);
  const [count, setCount] = useState("");


  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
      const { data } = await axiosInstance.get(`/Notes/Note?limit=8&offset=${(page - 1) * 8}`)
      setNote(data.notes)
      setCount(data.count)
    } catch (error) {
      alert("Error Notes")
    }
  }
  const handleAddNoteClick = () => {
    history.push('/NoteView')
  }

  useEffect(() => {
    getAllNotes();
  }, [page])

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div>
      {
        isLoading ? (
          <div className="DashboardDiv">
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
                {
                  note.map((note) => (
                    <NotePaper key={note._id} note={note} />
                  ))
                }
              </div>
              <div>
                <Stack spacing={2}>
                  <Pagination count={count > 0 ? (Math.ceil(count / 8)) : (1)} page={page} onChange={handlePageChange} />
                </Stack>
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
