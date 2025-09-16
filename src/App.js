// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Product from "./Product";
import ScreenWarning from "./components/ScreenWarning";
import Billing from "./Billing";
function App() {
  const [user, setUser] = useState(null);
  const [bypassWarning, setBypassWarning] = useState(false);

  // Restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ✅ Detect small screens (anything smaller than 900px width)
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  // Show warning unless user bypasses
  if (isSmallScreen && !bypassWarning) {
    return <ScreenWarning onContinue={() => setBypassWarning(true)} />;
  }

  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar user={user} setUser={setUser} />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup onLogin={setUser} />} />
            <Route path="/signin" element={<Signin onLogin={setUser} />} />
            <Route path="/product" element={<Product />} />
            <Route path="/billing" element={<Billing />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
