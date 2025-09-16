// src/pages/Product.js
import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";

const dummyProducts = [
  {
    id: 1,
    title: "Basic RDP Plan",
    description: "1 vCPU, 2GB RAM, 40GB SSD",
    image: "https://source.unsplash.com/400x300/?server,cloud",
    price: "$10/month",
  },
  {
    id: 2,
    title: "Pro RDP Plan",
    description: "2 vCPU, 4GB RAM, 80GB SSD",
    image: "https://source.unsplash.com/400x300/?data,technology",
    price: "$20/month",
  },
  {
    id: 3,
    title: "Enterprise RDP Plan",
    description: "4 vCPU, 8GB RAM, 160GB SSD",
    image: "https://source.unsplash.com/400x300/?business,server",
    price: "$40/month",
  },
];

export default function Product() {
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
                  {product.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ background: "#16a34a", textTransform: "none" }}
                  fullWidth
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
