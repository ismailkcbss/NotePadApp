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
      error,
    });
    console.log("Panel", error);
  }
};

const GetPanel = async (req, res) => {
//sort ile sıralama yap limit ile de 1 adet yazdır
  try {
    const panel = await Panel.find();
    res.status(200).json({
      succeded: true,
      panel,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
    console.log("Panel", error);
  }
};

export { CreatePanel, GetPanel };
