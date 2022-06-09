import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import ExerciseData from "./components/ExerciseData";
import EditExerciseData from "./components/EditExerciseData";
import CreateExerciseData from "./components/CreateExerciseData";
import CreateUserData from "./components/CreateUserData";
import ErrorPage from "./components/ErrorPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div className="container-fluid p-0 m-0" style={{display: 'grid'}}>
      <ToastContainer position="bottom-center" />
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact element={<ExerciseData />} />
        <Route path="/edit/:id" element={<EditExerciseData />} />
        <Route path="/create" element={<CreateExerciseData />} />
        <Route path="/user" element={<CreateUserData />} />
        <Route element={<ErrorPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);
