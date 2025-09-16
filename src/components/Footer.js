// src/components/Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "rgba(0,0,0,0.85)",
        py: 2,
        textAlign: "center",
        mt: "auto", // 👈 ensures it sticks to bottom
      }}
    >
      <Typography variant="body2" sx={{ color: "#bbb" }}>
        © {new Date().getFullYear()} ConnectfyLabs — Secure RDP Hosting
      </Typography>
    </Box>
  );
}
