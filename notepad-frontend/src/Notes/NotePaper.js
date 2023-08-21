import React from 'react'
import { useHistory } from 'react-router-dom';


export default function NotePaper(props) {

    const {note} = props;

    const history = useHistory();

    const handleClickNote = () => {
        history.push('/NoteModal')
    }

    return (
        <div className='MyNotesDiv'>
            {note.map((state) => (
                <div className='NotePaperDiv' key={state._id}>
                    <div className='NotesDiv' onClick={handleClickNote}>
                        <div className='NoteTitle'><span>Title:</span> {state.Title}</div>
                        <div className='NoteDescription'><span>Description:</span> {state.Description}</div>
                        <div className='NoteUpload'><span>Date:</span> {state.uploadedAt}</div>
                    </div>
                </div>
            ))
            }
        </div>

    )
}
