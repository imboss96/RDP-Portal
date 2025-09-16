// src/Signin.js
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
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Signin({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect query param (default to /product if not provided)
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/product";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const finishLogin = (userData) => {
    if (typeof onLogin === "function") {
      onLogin(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
    navigate(redirectPath); // ✅ go where user intended
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Sign In successful (mock)");
    finishLogin({
      name: "Demo User",
      email: form.email,
      avatar: "",
    });
  };

  const handleGoogleLogin = () => {
    console.log("Google Login clicked");
    finishLogin({ name: "Google User", avatar: "" });
  };

  const handleGithubLogin = () => {
    console.log("GitHub Login clicked");
    finishLogin({ name: "GitHub User", avatar: "" });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", mt: 10 }}
    >
      <Paper sx={{ p: 4, width: "100%", borderRadius: 3, boxShadow: 6 }}>
        <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
          Login to ConnectfyLabs
        </Typography>

        {/* Email/Password Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
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
            Sign In
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }}>OR</Divider>

        {/* Social Sign In */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            onClick={handleGoogleLogin}
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{
              textTransform: "none",
              borderColor: "rgba(0,0,0,0.2)",
              "&:hover": { borderColor: "#16a34a", color: "#16a34a" },
            }}
          >
            Continue with Google
          </Button>

          <Button
            onClick={handleGithubLogin}
            variant="outlined"
            startIcon={<GitHubIcon />}
            fullWidth
            sx={{
              textTransform: "none",
              borderColor: "rgba(0,0,0,0.2)",
              "&:hover": { borderColor: "#16a34a", color: "#16a34a" },
            }}
          >
            Continue with GitHub
          </Button>
        </Box>

        {/* Signup & Reset Links */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#16a34a", fontWeight: 600 }}>
              Sign Up
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <Link
              to="/reset-password"
              style={{ color: "#16a34a", fontWeight: 600 }}
            >
              Forgot Password?
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
