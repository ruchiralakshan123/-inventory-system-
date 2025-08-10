import React from "react";

import Home from "./components/Home/Home";
import AddItem from "./components/Addltem/Addltem";
import DisplayItem from "./components/DisplayItem/DisplayItem";
import UpdateItem from "./components/UpdateItem/UpdateItem";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserProfile from "./components/UserProfile/UserProfile";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventorySystem from './InventorySystem'; // relative path with ./



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InventorySystem />} />
        <Route path="/home" element={<Home />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/allitem" element={<DisplayItem />} />
        <Route path="/updateItem/:id" element={<UpdateItem />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        {/* User management */}
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/updateprofile/:id" element={<UpdateProfile />} />
        <Route path="/" element={<Navbar />} />

      </Routes>
    </div>
  );
}

export default App;
