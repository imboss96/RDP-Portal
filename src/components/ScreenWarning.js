// src/components/ScreenWarning.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function ScreenWarning({ onContinue }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        px: 2,
        background: "#111",
        color: "#fff",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        ⚠️ Screen Too Small
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 400, mb: 3 }}>
        Please switch to a desktop or larger screen for the best experience.
      </Typography>

      {/* Continue anyway button */}
      <Button
        variant="outlined"
        onClick={onContinue}
        sx={{
          borderColor: "#16a34a",
          color: "#16a34a",
          textTransform: "none",
          "&:hover": { borderColor: "#13903f", color: "#13903f" },
        }}
      >
        Continue with Limited Experience
      </Button>
    </Box>
  );
}
