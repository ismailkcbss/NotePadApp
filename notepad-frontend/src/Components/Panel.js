import React, { useState } from "react";

export default function Panel() {
  const initialForm = {
    TopTitle: "",
    TopDesc: "",
    MidTitle: "",
    MidDesc: "",
    BotTitle: "",
    BotDesc: "",
  };

  const [form, setForm] = useState({ ...initialForm });

  const handleTextChange = (value, key) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSave = () => {
    
  };

  return (
    <div className="PanelDiv">
      <form className="PanelForm">
        <input
          type="text"
          placeholder="Top Title"
          value={form.TopTitle}
          onChange={(e) => handleTextChange(e.target.value, "TopTitle")}
          className="PanelInput"
        />
        <input
          type="text"
          placeholder="Top Description"
          value={form.TopDesc}
          onChange={(e) => handleTextChange(e.target.value, "TopDesc")}
          className="PanelInput"
        />
        <input
          type="text"
          placeholder="Mid Title"
          value={form.MidTitle}
          onChange={(e) => handleTextChange(e.target.value, "MidTitle")}
          className="PanelInput"
        />
        <input
          type="text"
          placeholder="Mid Description"
          value={form.MidDesc}
          onChange={(e) => handleTextChange(e.target.value, "MidDesc")}
          className="PanelInput"
        />
        <input
          type="text"
          placeholder="Bot Title"
          value={form.BotTitle}
          onChange={(e) => handleTextChange(e.target.value, "BotTitle")}
          className="PanelInput"
        />
        <input
          type="text"
          placeholder="Bot Description"
          value={form.BotDesc}
          onChange={(e) => handleTextChange(e.target.value, "BotDesc")}
          className="PanelInput"
        />
        <button className="PanelButton" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
}
