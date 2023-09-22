import Panel from "../models/panelModel.js";

const CreatePanel = async (req, res) => {
  try {
    const panel = await Panel.create(req.body);
    res.status(201).json({
      succeded: true,
      panel,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error:"The panel could not be created",
    });
  }
};

const GetPagePanel = async (req, res) => {
  try {
    const panel = await Panel.find({}).sort({ "updatedAt": -1 }).limit(1); // Bu kısımda butun panelleri bulup son güncellenen paneli bulmak için sort aggregementi yazıp buluyoruz ekrana basıyoruz.
    res.status(200).json({
      succeded: true,
      panel,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error:"The panel could not be brought",
    });
  }
};

const GetPanel = async (req, res) => {
  try {
    const panel = await Panel.findById(req.params.id);
    res.status(200).json({
      succeded: true,
      panel,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error:"The panel could not be brought",
    });
  }
};

const UpdatePanel = async (req, res) => {
  try {
    const panel = await Panel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true }) // ilk parametre panelin frontdan gönderine id si ikincisi daha onceden oluşturulmuş bilgilerin bodyden alınması ve uzerine yazılması için de 3.parametre olarak da izin veriyoruz.
    res.status(201).json({
      succeded: true,
      panel,
    })
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error:"The panel data has not been updated",
    })
  }
}

export { CreatePanel, GetPanel, GetPagePanel, UpdatePanel };
