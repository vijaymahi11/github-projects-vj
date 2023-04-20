import React, { useState, useEffect } from "react";
import Form from "./Form";
import { Link, useNavigate, } from "react-router-dom";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import "./login.css";
import axios from "axios";
import success from "./success";
import { get } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { BsFillEyeSlashFill } from "react-icons/bs"
import tigma from './images/Vijay_logo.jpg';
import ReactLoading from "react-loading";
function Login() {
  localStorage.setItem('update', 'new')
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const navigate = useNavigate();
  function handleClick() {
    navigate("/form")
  }
  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/pagelogin', { values })
      .then(res => {
        console.log(res);
        console.log(res.data);
       
        if (res.data.status == 200) {
          localStorage.setItem('email', email)
          history("/layout");
          alert('Successfully Login');
        }
        if(res.data.status==700){
          alert("Incorrect email / password")
        }
        // else{
        //   alert("blocked")
        // }
      })

      setloggedOut(true)
  }
  React.useEffect(() => {
    if (localStorage.getItem('email')) history('/layout')
  }, [])
  const { email, password } = values;

  const[loggedInstate,setloggedOut]=useState(false);
  return (
    <div className="wrapper">
      <div class="logo">
        <img src={tigma} alt="" />
      </div>
      <div className="page-style">
        <form>
          <h2 className="head">USER LOGIN</h2>
          <br />
          <div class="form-field d-flex align-items-center">
            <FaRegUser className="User_icon" />
            <input
              type="email"
              name="email"
              className="form-inputs"
              onChange={handleChange}
              placeholder="Email"
              required
            /> </div>
          <br />
          <div class="form-field d-flex align-items-center">
            < BsFillEyeSlashFill className="User_icon" />
            <input
              type="password"
              name="password"
              className="form-inputs"
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <br />
          <input type="checkbox" name="remember" /> Remember me?
          <br />
          <br />
          <button class="btn mt-3" onClick={handleSubmit} >Login</button>
          <div>
            <br />
          </div>
        </form>
        <div class="text-center fs-6">
          <a onClick={handleClick}>Don't have an account? Sign up</a>
        {/* <div>
          {loggedInstate===true?<ReactLoading  type="spin" color="#0000FF" className="Spiner-load"
         />:""}
        </div>   */}
        </div>
      </div>
    </div>
  )
}
export default Login;














