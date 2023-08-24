import Notes from '../models/notesModel.js';



const CreateNotes = async (req, res) => {
    try {
        const note = await Notes.create({
            Title: req.body.Title,
            Description: req.body.Description,
            user: res.locals.user._id
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
        const notes = await Notes.find({ user: res.locals.user._id })
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

const GetSingleNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        res.status(201).json({
            succeded: true,
            note
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const DeleteNotes = async (req, res) => {
    try {
         await Notes.findByIdAndRemove({ _id: req.params.id });
         res.status(201).json({
            succeded:true,
         })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
        console.log("CATHE =",error);
    }
}
const UpdateNotes = async (req, res) => {
    try {
        const notes = await Notes.findById(req.params.id);

        notes.Title = req.body.Title;
        notes.Description = req.body.Description;
        notes.save();
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

export { CreateNotes, GetAllNotes, DeleteNotes, UpdateNotes, GetSingleNote }