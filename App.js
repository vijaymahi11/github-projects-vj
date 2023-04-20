import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, RouterLink, Link } from "react-router-dom";
import "./form.css";
import Form from "./Form";
import Login from "./login";
import Success from "./success";
import Axios from "axios";
import Home from "./home";
import Update from "./Update";
import Contact from "./contact";
import Dashboard from "./dashboard";
import Layout from "./Layout";
import "./layout.css"
import "./App.css"
import { Menu } from "@mui/material";
import showResult from "./showResult";
import SimpleForm from "./SimpleForm";
import myTable from "./myTable.";
import { store } from "./store";
import MyTable from "./myTable.";
import FieldArraysForm from "./rootReducer";
import MyForm from "./rootReducer";
import { FaVuejs } from "react-icons/fa";
import RootReducer from "./rootReducer";
import Redux_list from "./rootReducer";
import Listtable from "./listTable";
import Attendance from "./Attendance";
import Contactus from "./Contactus";
import PieChart from "./Piachart";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='login' element={<Login />} />
          <Route path='/form' element={<Form />} />
     
   
          <Route path='/layout' element={<Layout />}>
            <Route path="success" element={<Success />} />
            <Route path='home' element={<Home />} />
            <Route path='redux' element={<Listtable />} />
            <Route path='contact' element={<Contactus />} />
            <Route path="attend" element={<Attendance />} />
            <Route path="logout" element={<Login />} />
          </Route>
          <Route path='Update' element={<Update />} />
         
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;










