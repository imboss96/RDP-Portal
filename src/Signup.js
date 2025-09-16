// src/Signup.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);

    // Simulate signup success
    if (typeof onLogin === "function") {
      onLogin({ name: form.name || "New User", avatar: "" });
    }
    navigate("/product");
  };

  const handleGoogleSignup = () => {
    console.log("Google Signup clicked");
    if (typeof onLogin === "function") {
      onLogin({ name: "Google User", avatar: "" });
    }
    navigate("/product");
  };

  const handleGithubSignup = () => {
    console.log("GitHub Signup clicked");
    if (typeof onLogin === "function") {
      onLogin({ name: "GitHub User", avatar: "" });
    }
    navigate("/product");
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper sx={{ p: 4, width: "100%", borderRadius: 3, boxShadow: 6 }}>
        <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
          Create Your Account
        </Typography>

        {/* Signup Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ background: "#16a34a", mt: 2 }}
            fullWidth
          >
            Sign Up
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }}>OR</Divider>

        {/* Social Signup */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            onClick={handleGoogleSignup}
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{
              textTransform: "none",
              borderColor: "rgba(0,0,0,0.2)",
              "&:hover": { borderColor: "#16a34a", color: "#16a34a" },
            }}
          >
            Sign Up with Google
          </Button>

          <Button
            onClick={handleGithubSignup}
            variant="outlined"
            startIcon={<GitHubIcon />}
            fullWidth
            sx={{
              textTransform: "none",
              borderColor: "rgba(0,0,0,0.2)",
              "&:hover": { borderColor: "#16a34a", color: "#16a34a" },
            }}
          >
            Sign Up with GitHub
          </Button>
        </Box>

        {/* Signin Link */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "#16a34a", fontWeight: 600 }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
