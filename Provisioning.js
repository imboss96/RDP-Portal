import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, CircularProgress, Box, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Provisioning() {
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);

  const method = queryParams.get("method");
  const product = queryParams.get("product");
  const price = queryParams.get("price");
  const serverLocation = queryParams.get("location");
  const os = queryParams.get("os");
  const cpu = queryParams.get("cpu");
  const ram = queryParams.get("ram");
  const bandwidth = queryParams.get("bandwidth");

  const [loading, setLoading] = useState(true);
  const [serverData, setServerData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function provisionServer() {
      try {
        const response = await fetch("http://localhost:5000/api/provision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method,
            product,
            price,
            location: serverLocation,
            os,
            cpu,
            ram,
            bandwidth,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setServerData(data.server);
        } else {
          setError("Provisioning failed.");
        }
      } catch (err) {
        setError("Could not connect to backend API.");
      } finally {
        setLoading(false);
      }
    }

    provisionServer();
  }, [method, product, price, serverLocation, os, cpu, ram, bandwidth]);

  return (
    <Container sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
        {loading && (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Provisioning your server...</Typography>
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {serverData && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
              🎉 Server Created Successfully!
            </Typography>
            <Typography>IP Address: {serverData.ip}</Typography>
            <Typography>Username: {serverData.username}</Typography>
            <Typography>Password: {serverData.password}</Typography>
            <Typography>Status: {serverData.status}</Typography>
            <Typography>OS: {serverData.os}</Typography>
            <Typography>CPU: {serverData.cpu} vCPUs</Typography>
            <Typography>RAM: {serverData.ram} GB</Typography>
            <Typography>Bandwidth: {serverData.bandwidth} Mbps</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
