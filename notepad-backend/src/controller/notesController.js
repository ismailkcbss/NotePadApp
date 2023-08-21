import Notes from '../models/notesModel.js';


const CreateNotes = async (req, res) => {
    try {
        const notes = await Notes.create(req.body)
        res.status(201).json({
            succeded: true,
            notes
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const GetAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find({})
        res.status(200).json({
            succeded: true,
            notes
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
        console.log(error);
    }
}

export { CreateNotes, GetAllNotes }