import Notes from '../models/notesModel.js';



const CreateNotes = async (req, res) => {
    try {
        const note = await Notes.create({
            Title: req.body.Title,
            Description: req.body.Description,
            user:res.locals.user._id
        }
        )
        res.status(200).json({
            succeded: true,
            note
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
        console.log(error);
    }
}

const GetAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find({user:res.locals.user._id})
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