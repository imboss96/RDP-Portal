// src/Signin.js
import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User signed in:", form);
    // TODO: Add real authentication logic here
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 3,
            boxShadow: 4,
            background: "rgba(255,255,255,0.95)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Sign In
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Welcome back! Please enter your details.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontWeight: 600, background: "#1f6feb" }}
            >
              Sign In
            </Button>
          </form>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link
                component="button"
                onClick={() => navigate("/signup")}
                sx={{ fontWeight: 600 }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
