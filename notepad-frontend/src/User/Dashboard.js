import React, { useEffect, useState } from 'react'
import UserInfo from '../Components/UserInfo';
import NotePaper from '../Notes/NotePaper';
import { axiosInstance } from '../axios.util';
import Loading from '../Loading';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/slice/userSlice';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Navbar from '../Components/Navbar';

export default function Dashboard() {

  const dispatch = useDispatch();
  const history = useHistory();


  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState("");
  const [note, setNote] = useState([])
  const [page, setPage] = useState(1);
  const [count, setCount] = useState("");


  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleAddNoteClick = () => {
    history.push('/NoteView')
  }



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
      const { data } = await axiosInstance.get(`/Notes/Note?limit=12&offset=${(page - 1) * 12}`)
      setNote(data.notes)
      setCount(data.count)
    } catch (error) {
      alert("Error Notes")
    }
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
          <div className='DashboardContainer' >
            <Navbar />
            <div className="SubContainer">
              <div className="UserContainer">
                <UserInfo userData={userData} />
              </div>
              <div className="NotePadContainer">
                <div className="AddNewNoteDiv">
                  <h3>NotePad</h3>
                  <div className='PaginationDiv'>
                    <Stack spacing={2}>
                      <Pagination count={count > 0 ? (Math.ceil(count / 12)) : (1)} page={page} onChange={handlePageChange} />
                    </Stack>
                  </div>
                  <button className='AddNewNoteButton' onClick={handleAddNoteClick}>Add New Note</button>
                </div>
                <hr />
                {
                  note[0] ? (
                    <div className="NotesDiv">
                      {
                        note.map((note) => (
                          <NotePaper key={note._id} note={note} />
                        ))
                      }
                    </div>
                  ) : (
                    <div style={{ width: "100%", height: "15em", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <p>There is no note yet. Click on the button and add </p>
                    </div>
                  )
                }

              </div>
            </div>
          </div>
        ) : (
          <div id='LoadingDiv'>
            <Loading />
          </div>
        )
      }
    </div >

  )
}
