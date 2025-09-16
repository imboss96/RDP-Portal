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
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Sign In successful (mock)");
    navigate("/product");
  };

  const handleGoogleLogin = () => {
    alert("✅ Google Sign In successful (mock)");
    navigate("/product");
  };

  const handleGithubLogin = () => {
    alert("✅ GitHub Sign In successful (mock)");
    navigate("/product");
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

        {/* Forgot Password */}
        <Typography
          align="right"
          sx={{ mt: 1, fontSize: "0.9rem" }}
        >
          <Link to="/reset-password" style={{ color: "#1f6feb", fontWeight: "bold" }}>
            Forgot password?
          </Link>
        </Typography>

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

        {/* No account yet */}
        <Typography align="center" sx={{ mt: 3 }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#1f6feb", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
