import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; 
    return regex.test(password);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10,15}$/; // allow 10–15 digits
    return regex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(form.phone)) {
      setError("Please enter a valid phone number (10–15 digits).");
      return;
    }

    if (!validatePassword(form.password)) {
      setError(
        "Password must be at least 8 characters, include 1 uppercase letter and 1 number."
      );
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    alert("✅ Signup successful (connect backend later)");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 6 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Create an Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            fullWidth
            margin="normal"
            value={form.phone}
            onChange={handleChange}
            required
            helperText="Enter a valid phone number (digits only)"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
            helperText="At least 8 characters, include uppercase and number"
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.2, fontWeight: "bold", background: "#1f6feb" }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }}>OR</Divider>

        {/* Google Signup */}
        <Button
          fullWidth
          variant="outlined"
          sx={{ py: 1.2, fontWeight: "bold" }}
          onClick={() => alert("🔗 Google signup to be integrated with Firebase")}
        >
          Sign up with Google
        </Button>

        {/* Already have account */}
        <Typography align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link to="/signin" style={{ color: "#1f6feb", fontWeight: "bold" }}>
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
