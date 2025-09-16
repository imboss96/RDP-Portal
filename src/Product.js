// src/pages/Product.js
import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const dummyProducts = [
  {
    id: 1,
    title: "Basic RDP Plan",
    description: "1 vCPU, 2GB RAM, 40GB SSD",
    image: "https://source.unsplash.com/400x300/?server,cloud",
    price: 10,
  },
  {
    id: 2,
    title: "Pro RDP Plan",
    description: "2 vCPU, 4GB RAM, 80GB SSD",
    image: "https://source.unsplash.com/400x300/?data,technology",
    price: 20,
  },
  {
    id: 3,
    title: "Enterprise RDP Plan",
    description: "4 vCPU, 8GB RAM, 160GB SSD",
    image: "https://source.unsplash.com/400x300/?business,server",
    price: 40,
  },
];

// ✅ Pricing Function with multipliers
function calculatePrice(cpu, ram, bandwidth, location, os) {
  let basePrice = cpu * 3 + ram * 2 + bandwidth / 50;

  // Location multipliers
  if (location === "USA") basePrice *= 1.5;
  else if (location === "Europe") basePrice *= 1.3;
  else if (location === "Asia") basePrice *= 1.2;
  else if (location === "Africa") basePrice *= 1.1;

  // OS multipliers
  if (os.includes("Windows")) basePrice *= 1.5;
  else if (os.includes("CentOS")) basePrice *= 1.2;
  else basePrice *= 1.0; // Ubuntu/Debian stable

  return basePrice.toFixed(2);
}

export default function Product() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("USA");
  const [os, setOs] = useState("Ubuntu 22.04");
  const [bandwidth, setBandwidth] = useState(100); // in Mbps
  const [ram, setRam] = useState(4); // in GB
  const [cpu, setCpu] = useState(2); // in vCPU

  const handleBuyNow = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate(`/billing?product=${product.id}&price=${product.price}`);
    } else {
      navigate(
        `/signin?redirect=/billing?product=${product.id}&price=${product.price}`
      );
    }
  };

  const handleCustomServer = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const customPrice = calculatePrice(cpu, ram, bandwidth, location, os);
    const queryParams = `product=custom&price=${customPrice}&location=${location}&os=${os}&cpu=${cpu}&ram=${ram}&bandwidth=${bandwidth}`;

    if (user) {
      navigate(`/billing?${queryParams}`);
    } else {
      navigate(`/signin?redirect=/billing?${queryParams}`);
    }
  };

  const estimatedPrice = calculatePrice(cpu, ram, bandwidth, location, os);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }} align="center">
        Available RDP Plans
      </Typography>
      <Grid container spacing={4}>
        {dummyProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="180"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {product.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  ${product.price}/month
                </Typography>
                <Button
                  variant="contained"
                  sx={{ background: "#16a34a", textTransform: "none" }}
                  fullWidth
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Build Your Own Server Section */}
      <Box sx={{ mt: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
            Build Your Own Server
          </Typography>

          {/* Location */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Server Location</InputLabel>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Africa">Africa</MenuItem>
            </Select>
          </FormControl>

          {/* OS */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Server OS</InputLabel>
            <Select value={os} onChange={(e) => setOs(e.target.value)}>
              <MenuItem value="Ubuntu 22.04">Ubuntu 22.04</MenuItem>
              <MenuItem value="Ubuntu 20.04">Ubuntu 20.04</MenuItem>
              <MenuItem value="Debian 11">Debian 11</MenuItem>
              <MenuItem value="CentOS 7">CentOS 7</MenuItem>
              <MenuItem value="Windows Server 2019">
                Windows Server 2019
              </MenuItem>
              <MenuItem value="Windows Server 2022">
                Windows Server 2022
              </MenuItem>
            </Select>
          </FormControl>

          {/* CPU Slider */}
          <Typography gutterBottom>CPU (vCPUs)</Typography>
          <Slider
            value={cpu}
            onChange={(e, val) => setCpu(val)}
            step={1}
            marks
            min={1}
            max={32}
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          {/* RAM Slider */}
          <Typography gutterBottom>RAM (GB)</Typography>
          <Slider
            value={ram}
            onChange={(e, val) => setRam(val)}
            step={2}
            marks
            min={2}
            max={64}
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          {/* Bandwidth Slider */}
          <Typography gutterBottom>Bandwidth (Mbps)</Typography>
          <Slider
            value={bandwidth}
            onChange={(e, val) => setBandwidth(val)}
            step={50}
            marks
            min={50}
            max={1000}
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          {/* Price Preview */}
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Estimated Price: ${estimatedPrice}/month
          </Typography>

          <Button
            variant="contained"
            sx={{ background: "#2563eb", textTransform: "none" }}
            fullWidth
            onClick={handleCustomServer}
          >
            Continue to Billing
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
