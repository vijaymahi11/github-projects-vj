import ReactDOM from "react-dom/client";
import React from "react";
import react, { Component } from 'react';
import { render } from 'react-dom';
import App from "./App";
import Form from "./Form";
import Login from "./login";
import success from "./success";
import Home from "./home";
import Update from "./Update";
import Dashboard from "./dashboard";
import Contact from "./contact";
import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { showResult } from "./showResult";
import SimpleForm from "./SimpleForm";
import { createStore } from "redux";
import  CricketReducer from "./store";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

