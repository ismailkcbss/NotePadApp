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

//sort  = küçükten büyüğe için -1 z den a ya veya sondan başa // 1 ise a dan z ye gibi sıralar
//skip  = verilen sayı kadar atlayıp gösterme
//limit = her page de gösterilecek sayı miktarı
const GetAllNotes = async (req, res) => {
    let { limit, offset, key } = req.query;
    try {
        const notes = await Notes.find({ user: res.locals.user._id }).skip(offset).limit(limit).sort({ "updatedAt": -1 })
        const count = await Notes.find({ user: res.locals.user._id }).count();
        res.status(200).json({
            succeded: true,
            notes,
            count
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
        console.log(error);
    }
}
const GetFilterNotes = async (req, res) => {
    try {
        let key = req.query.key;
        const notes = await Notes.aggregate([{
            $match: {
                $and: [
                    { user: res.locals.user._id },
                    { "Title": new RegExp(key, 'i') }
                ]
            }
        }])
        res.status(201).json({
            succeded: true,
            count: notes.length,
            notes
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
        console.log(error);
    }
    /*
    , async function(err, not){
                if(err){
                    res.status(500).json({
                        succeded: false,
                        err
                    })
                }
                notes = await Notes.aggregate([{ $match: { Description: new RegExp(key, 'i') } }])
                res.status(201).json({
                    succeded: true,
                    length: notes.length,
                    not,
                })
            }
    */
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
            succeded: true,
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
        console.log("CATHE =", error);
    }
}

const UpdateNotes = async (req, res) => {
    try {
        const notes = await Notes.findById(req.params.id);

        notes.Title = req.body.Title;
        notes.Description = req.body.Description;
        await notes.save();
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

export { CreateNotes, GetAllNotes, DeleteNotes, UpdateNotes, GetSingleNote, GetFilterNotes }