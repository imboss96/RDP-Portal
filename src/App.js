// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
import Product from "./Product";
import { Box } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    alert("Login successful!");
  };

  const handleLogout = () => {
    setUser(null);
    alert("Logged out!");
  };

  return (
    <Router>
      {/* Make app a full-height flex column */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar user={user} onLogout={handleLogout} />

        {/* Main content area grows to fill space */}
        <Box component="main" sx={{ flex: 1, mt: 8 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </Box>

        {/* Footer stays at the bottom */}
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
