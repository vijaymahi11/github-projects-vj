import { Outlet, Link, useNavigate } from "react-router-dom";
import React from 'react'
import "./layout.css";
import picture from './images/newlogo.png';

function Layout() {
  const history = useNavigate();
  const [logout, setLogout] = React.useState(false)
  React.useEffect(() => {
    if (!localStorage.getItem('email')) history('/login')
}, [logout])
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("email");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("mobileno");
    localStorage.removeItem("country");
    localStorage.removeItem("city");
    localStorage.removeItem("password");
    localStorage.removeItem("gender");
    localStorage.removeItem("id");
    localStorage.removeItem("profile");
    
    setLogout(true);
  }
  return (
    <>
      <div className="topnav">
        <nav className="navbar">
        <ul className="nav-list">
        <div>
        <img src={picture} className="Tigma-logo"/>
        </div> 
          <div className="justnnow">
          <div className="homeStyle">
              <Link to="success" >Home</Link>
              </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <Link to="home" >Users</Link>
              </div>&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <div>
              <Link to="redux" >Redux</Link>
              </div>&nbsp;&nbsp;&nbsp;&nbsp; */}
            <div>
              <Link to="attend">Dashboard</Link>
              </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <Link to="contact">Contact</Link>
              </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <Link to="login" onClick={logoutHandler}>Logout</Link>
              </div>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <Outlet />
            </ul>
        </nav>
      </div>
      <div className="outlet-cls">
      </div>
    </>
  )
};
export default Layout;
