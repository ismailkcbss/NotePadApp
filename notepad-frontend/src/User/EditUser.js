import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axios.util";
import { useHistory, useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import * as Storage from "../storage.helper";
import alertify from "alertifyjs";

export default function Register() {
  const initialForm = {
    FullName: "",
    Email: "",
    Password: "",
    Phone: "",
  };
  const { id } = useParams();
  const history = useHistory();

  const [form, setForm] = useState({ ...initialForm });
  const [image, setImage] = useState(null);
  const [img, setImg] = useState(null);

  const handleTextChange = (value, key) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleClickReturn = () => {
    history.push("/Dashboard");
  };

  //Firebase gönderilecek image nin url adresini takip etme
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  console.log(image);
  const UserUpdate = async () => {
    var newFotoUrl = null;  
    try {
      debugger;
      if (image) {
        const imageRef = ref(storage, uuidv4());
        await uploadBytes(imageRef, image);
        newFotoUrl = await getDownloadURL(imageRef);
        setImg(newFotoUrl);
      }
      debugger;
      console.log(newFotoUrl);
      const { data } = await axiosInstance.post(`/Users/EditUser/${id}`, {
        FullName: form.FullName,
        Email: form.Email,
        Phone: form.Phone,
        Image: newFotoUrl || img,
      });
      history.push("/Dashboard");
      alertify.Success("Success");
    } catch (error) {
      alertify.error(error);
    }
  };
  console.log(img);
  const UserMe = async () => {
    const token = Storage.getValueByKey("jwt");
    if (token) {
      try {
        const { data } = await axiosInstance.get(`/Users/UserMe`);
        setForm({
          FullName: data.user.FullName,
          Email: data.user.Email,
          Phone: data.user.Phone,
        });
        setImg(data.user.Image);
      } catch (error) {
        alertify.error("No user");
      }
    }
  };
  useEffect(() => {
    UserMe();
  }, []);

  return (
    <div className="EditUserDiv">
      <img className="EditUserImg" src={img} alt="OldImage" />
      <div className="FormDivHeader">
        <button onClick={handleClickReturn}>
          <ChevronLeftIcon sx={{ fontSize: "2em" }} />
        </button>{" "}
        <h3>Please Enter Your Information</h3>
      </div>
      <form>
        <div className="EditUserForm">
          <input
            type="text"
            placeholder="Full Name"
            value={form.FullName}
            onChange={(e) => handleTextChange(e.target.value, "FullName")}
            className="EditUserInput"
            required
          />
          <input
            type="text"
            placeholder="Email Address"
            value={form.Email}
            onChange={(e) => handleTextChange(e.target.value, "Email")}
            className="EditUserInput"
            required
          />
          <input
            type="number"
            placeholder="Phone"
            value={form.Phone}
            onChange={(e) => handleTextChange(e.target.value, "Phone")}
            className="EditUserInput"
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            style={{ margin: "30px" }}
          />
          <button className="RegisterButton" onClick={UserUpdate}>
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
}
