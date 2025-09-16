// src/components/Navbar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ButtonBase,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(0,0,0,0.85)",
        zIndex: (theme) => theme.zIndex.appBar + 1,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Clickable logo (image + text) - wraps everything in ButtonBase linked to "/" */}
        <ButtonBase
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            borderRadius: 1,
            px: 1,
            "&:hover": { opacity: 0.9 },
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="ConnectfyLabs Logo"
            sx={{ height: 36, width: 36, objectFit: "contain", mr: 1 }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#16a34a",
              textShadow: "1px 1px 3px rgba(255,255,255,0.15)",
            }}
          >
            ConnectfyLabs
          </Typography>
        </ButtonBase>

        {/* Right side navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button component={Link} to="/product" color="inherit" sx={{ textTransform: "none" }}>
            Products
          </Button>

          {!user ? (
            <>
              <Button
                component={Link}
                to="/signin"
                sx={{ color: "#fff", fontWeight: 700, textTransform: "none" }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  background: "#16a34a",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  "&:hover": { background: "#13903f" },
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Avatar
                alt={user.name || "User"}
                src={user.avatar || ""}
                sx={{ bgcolor: "#16a34a", cursor: "pointer" }}
                onClick={handleMenuOpen}
              />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={() => { handleMenuClose(); /* navigate to profile if desired */ }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); /* navigate to settings if desired */ }}>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    onLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
