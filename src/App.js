// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';
import Home from "./pages/Home.js";
import MyCourses from "./pages/MyCourses.js";
import NotFound from "./pages/NotFound.js";
import CourseDetail from "./pages/CourseDetail.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Header from "./elements/Header.js";
import SearchResult from "./pages/SearchResult.js";
import Learning from "./pages/Learning.js";
import Dashboard from "./pages/admin/dashboard.js";
import Profile from "./pages/Profile.js";

function App() {
  return <>
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<>
          <Header />
          <Home />
        </>
        }/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/my-courses" element={<>
          <Header />
          <MyCourses />
        </>}/>
        <Route path="/course/:id" element={<>
          <Header />
          <CourseDetail />
        </>}/>
        <Route path="/search" element={<>
          <Header />
          <SearchResult />
        </>} />
        <Route path="/learning" element={<>
          <Learning />
        </>}/>
        <Route path="/profile/:id" element={<>
          <Header />
          <Profile />
        </>}/>
        <Route path="/admin" element={<>
          <Dashboard />
        </>
        }/>
        <Route path="*" element={<>
          <Header />
          <NotFound />
        </>}/>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
