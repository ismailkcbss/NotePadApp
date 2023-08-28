import React from 'react'
import moment from 'moment/moment'; // DB den gelen tarihi formatlamak
import { useHistory } from 'react-router-dom';

export default function NotePaper(props) {

    const { note } = props;
    const history = useHistory();

    const handleNoteClick = () => {
        history.push(`/NoteView/${note._id}`)
    }


    return (
        <div className='MyNotesDiv'>
            <div className='NotePaperDiv' onClick={handleNoteClick} key={note._id}>
                <div className='NotesInfo'>
                    <div className='NoteTitle'><span>Title:</span> {note.Title}</div>
                    <div className='NoteDescription'><span>Description:</span>
                    <p>{note.Description}</p></div>
                    <div className='NoteUpload'>
                        <span>Date: {moment(note.uploadedAt).format('DD.MM.YYYY')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
