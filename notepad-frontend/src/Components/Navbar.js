import React from "react";
import * as storage from "../storage.helper";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie"; // Frontend tarafından cookie işlemleri için kullandığımız paket
import { userActions } from "../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";


export default function Navbarr() {

  const history = useHistory();
  const dispatch = useDispatch();
  
  const token = storage.getValueByKey("jwt");
  
  //Cookie role kontrol
  const user = useSelector((state) => state.user)
  if (user.isAuth) {
    var data = null; //(?) 
    const GetCookie = (role) => {
      return Cookie.get(role);
    }
    const CookikeRole = GetCookie("role")
    data = jwtDecode(CookikeRole);
    var role = data.role;
  }
  // cookieyi silme
  const RemoveCookie = (jwt, role) => {
    Cookie.remove(jwt);
    Cookie.remove(role);
  };

  //Pagination Route
  const handleSendMail = () => {
    history.push("/Contact");
  };
  const handleDashboard = () => {
    history.push("/Dashboard");
  };
  const handleLogin = () => {
    history.push("/Login");
  };
  const handlePanel = () => {
    history.push("/AdminPanel");
  };
  const handleHome = () => {
    history.push("/");
  };

  //Logout Button
  const handleClickLogout = () => {
    dispatch(userActions.logout());
    storage.setKeyWithValue("jwt", ""); // Logout tusuna basınca storage den cookie yi siler
    RemoveCookie("jwt", "role"); // Logout tuşuna basınca cookiyi siler.
    history.push("/");
  };

  return (
    <div className="NavbarDiv">
      {token ? (
        <div className="NavbarButtonDiv">
          {role ? (
            <button className="NavbarButton" onClick={handlePanel}>
              Panel
            </button>
          ) : (
            ""
          )}
          <button className="NavbarButton" onClick={handleHome}>
            Home
          </button>
          <button className="NavbarButton" onClick={handleDashboard}>
            Dashboard
          </button>
          <button className="NavbarButton" onClick={handleSendMail}>
            Contact
          </button>
          <button className="NavbarButton" onClick={handleClickLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="NavbarButtonDiv">
          <button className="NavbarButton" onClick={handleSendMail}>
            Contact
          </button>
          <button className="NavbarButton" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}
