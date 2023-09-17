import React, { useState } from "react";
import { axiosInstance } from "../axios.util";
import alertify from "alertifyjs";
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import UsersDataTable from "./UsersDataTable";

export default function AdminPanel() {
  const initialForm = {
    TopTitle: "",
    TopDesc: "",
    MidTitle: "",
    MidDesc: "",
    BotTitle: "",
    BotDesc: "",
  };
  // const { id } = useParams();

  const [form, setForm] = useState({ ...initialForm });
  const [allUsersData, setAllUsersData] = useState([]);
  const handleTextChange = (value, key) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSave = async (event) => {
    if (form.TopTitle.trim() === "" || form.TopDesc.trim() === "" ||
      form.MidTitle.trim() === "" || form.MidDesc.trim() === "" ||
      form.BotTitle.trim() === "" || form.BotDesc.trim === "") {
      alertify.error("Boş Alanlar Zorunludur")
      return;
    }
    event.preventDefault();
    try {
      const { data } = await axiosInstance.post(`/Panel/Content`, {
        TopTitle: form.TopTitle,
        TopDesc: form.TopDesc,
        MidTitle: form.MidTitle,
        MidDesc: form.MidDesc,
        BotTitle: form.BotTitle,
        BotDesc: form.BotDesc,
      })
      alertify.success("Panel Kayıt Başarılı")
    } catch (error) {
      alertify.error("Panel Eklenemedi")
    }
    setForm({ ...initialForm });
  };

  const GetAllUser = async () => {
    try {
      const { data } = await axiosInstance.get(`/Users/GetAllUser`)
      setAllUsersData(data.user)
      alertify.success("All Users Have Been Received")
    } catch (error) {
      alertify.error("Not Get All User")
    }
  }
  useEffect(() => {
    GetAllUser();
  }, [])

  return (
    <div className="PanelDiv">
      <div>
        <h4 style={{ margin: "2em 0 1em 2em" }}>Information to be Added to the Main Page </h4>
        <form className="PanelForm">
          <input
            type="text"
            placeholder="Top Title"
            value={form.TopTitle}
            onChange={(e) => handleTextChange(e.target.value, "TopTitle")}
            className="PanelInput"
          />
          <textarea
            rows={12}
            cols={56}
            placeholder="Top Description"
            value={form.TopDesc}
            onChange={(e) => handleTextChange(e.target.value, "TopDesc")}
            maxLength={5000}
            min={0}
          />
          <input
            type="text"
            placeholder="Mid Title"
            value={form.MidTitle}
            onChange={(e) => handleTextChange(e.target.value, "MidTitle")}
            className="PanelInput"
          />
          <textarea
            rows={12}
            cols={56}
            placeholder="Mid Description"
            value={form.MidDesc}
            onChange={(e) => handleTextChange(e.target.value, "MidDesc")}
            maxLength={5000}
            min={0}
          />
          <input
            type="text"
            placeholder="Bot Title"
            value={form.BotTitle}
            onChange={(e) => handleTextChange(e.target.value, "BotTitle")}
            className="PanelInput"
          />
          <textarea
            rows={12}
            cols={56}
            placeholder="Bot Description"
            value={form.BotDesc}
            onChange={(e) => handleTextChange(e.target.value, "BotDesc")}
            maxLength={5000}
            min={0}
          />
          <button className="PanelButton" onClick={handleSave}>Save</button>
        </form>
      </div>

      <div >
        <h4 style={{ margin: "2em 0 1em 2em",textAlign:"center" }}>All Users</h4>
        <UsersDataTable allUsersData={allUsersData} setAllUsersData={setAllUsersData} />
      </div>

    </div>
  );
}
