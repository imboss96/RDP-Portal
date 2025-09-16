// src/Home.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

export default function Home() {
  const images = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1920&q=80",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Background Slideshow */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
          zIndex: -2,
        }}
      />
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.65)",
          zIndex: -1,
        }}
      />

      {/* Hero */}
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 900, color: "#fff", mb: 2 }}>
          Secure & Fast Remote <br /> Desktop (RDP) Services
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "rgba(255,255,255,0.9)", maxWidth: 800 }}
        >
          Access your workstations, applications, and servers anytime, anywhere
          with our reliable cloud-based RDP hosting.
        </Typography>

        {/* Email Signup */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            width: "100%",
            maxWidth: 700,
          }}
        >
          <TextField
            placeholder="Enter your email"
            variant="outlined"
            size="small"
            sx={{ background: "#fff", borderRadius: 1, flex: 1 }}
          />
          <Button variant="contained" sx={{ background: "#16a34a", px: 4 }}>
            Get Started
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.5)",
              px: 3,
              "&:hover": { borderColor: "#fff" },
            }}
          >
            Live Demo
          </Button>
        </Box>
      </Container>

      {/* Services */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 700, mb: 6, color: "#fff" }}
        >
          Why Choose Our RDP Services?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Blazing Fast Performance",
              desc: "SSD-powered servers optimized for speed and low latency.",
              color: "#2563eb",
            },
            {
              title: "Secure Connections",
              desc: "Enterprise-grade encryption keeps your sessions safe.",
              color: "#10b981",
            },
            {
              title: "24/7 Uptime",
              desc: "Cloud infrastructure with 99.9% uptime guarantee.",
              color: "#f59e0b",
            },
            {
              title: "Scalable Plans",
              desc: "Flexible packages that grow with your needs.",
              color: "#8b5cf6",
            },
          ].map((service, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  background: service.color,
                  color: "#fff",
                  "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2">{service.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
