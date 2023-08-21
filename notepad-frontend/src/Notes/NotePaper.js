import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment/moment'; // DB den gelen tarihi formatlamak

export default function NotePaper(props) {

    const { note , setVisited } = props;

    const handleClickNote = () => {
        setVisited(true)
    }

    return (
        <div className='MyNotesDiv'>
            {note.map((state) => (
                <div className='NotePaperDiv' key={state._id}>
                    <div className='NotesDiv'>
                        <div className='NoteTitle'><span>Title:</span> {state.Title}</div>
                        <div className='NoteDescription'><span>Description:</span> {state.Description}</div>
                        <div className='NoteUpload'>
                            <span>Date: {moment(state.uploadedAt).format('DD.MM.YYYY')}</span>
                            <div className='IconButton'>
                                <button onClick={handleClickNote} className='EditIcon'><EditIcon /></button>
                                <button onClick={handleClickNote} className='DeleteIcon'><DeleteIcon /></button>
                            </div>

                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}
