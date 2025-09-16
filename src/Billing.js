// src/pages/Billing.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Billing() {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);

  const product = queryParams.get("product");
  const priceUSD = parseFloat(queryParams.get("price")) || 0;

  const customLocation = queryParams.get("location");
  const customOs = queryParams.get("os");
  const customRam = queryParams.get("ram");
  const customBandwidth = queryParams.get("bandwidth");
  const customCpu = queryParams.get("cpu");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const USD_TO_KES = 129.3;
  const priceKES = (priceUSD * USD_TO_KES).toFixed(2);

  useEffect(() => {
    if (!product) {
      navigate("/product");
    }
  }, [product, navigate]);

  // ✅ Unified redirect after success
  const handleConfirmPayment = (method) => {
    navigate(
      `/provisioning?method=${method}&product=${product}&price=${priceUSD}`
    );
  };

  // --- M-Pesa ---
  const initiateMpesaPayment = () => {
    if (!mpesaNumber) {
      setAlertType("error");
      setAlertMessage("Please enter your M-Pesa number");
      return;
    }
    if (!/^\d{10}$/.test(mpesaNumber)) {
      setAlertType("error");
      setAlertMessage("Enter a valid 10-digit M-Pesa number");
      return;
    }

    setPaymentStatus("processing");
    setAlertType("info");
    setAlertMessage("Waiting for payment confirmation...");

    setTimeout(() => {
      setPaymentStatus("failed"); // simulate failure to allow manual entry
      setAlertType("warning");
      setAlertMessage("Payment not detected. Please enter transaction reference.");
    }, 3000);
  };

  const checkTransaction = () => {
    if (transactionId.trim() !== "") {
      setPaymentStatus("success");
      setAlertType("success");
      setAlertMessage("Payment verified successfully!");
    } else {
      setAlertType("error");
      setAlertMessage("Please enter a valid transaction reference");
    }
  };

  // --- Binance ---
  const handleBinancePayment = () => {
    setPaymentStatus("success");
    setAlertType("success");
    setAlertMessage("Binance payment verified!");
  };

  // --- Card ---
  const handleCardPayment = () => {
    setPaymentStatus("success");
    setAlertType("success");
    setAlertMessage("Card saved & payment processed!");
  };

  return (
    <Container sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
          Billing & Payment
        </Typography>

        {/* Summary */}
        {product === "custom" ? (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Custom Server Configuration</Typography>
            <Typography>Location: {customLocation}</Typography>
            <Typography>OS: {customOs}</Typography>
            <Typography>CPU: {customCpu} vCPUs</Typography>
            <Typography>RAM: {customRam} GB</Typography>
            <Typography>Bandwidth: {customBandwidth} Mbps</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1 }}>
              Price: ${priceUSD}/month
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Selected Product</Typography>
            <Typography>Plan: {product}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1 }}>
              Price: ${priceUSD}/month
            </Typography>
          </Box>
        )}

        {/* Alert messages */}
        {alertMessage && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {alertMessage}
          </Alert>
        )}

        {/* Payment Methods */}
        <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant={paymentMethod === "mpesa" ? "contained" : "outlined"}
            onClick={() => setPaymentMethod("mpesa")}
          >
            Pay with M-Pesa
          </Button>
          <Button
            variant={paymentMethod === "binance" ? "contained" : "outlined"}
            onClick={() => setPaymentMethod("binance")}
          >
            Binance Pay
          </Button>
          <Button
            variant={paymentMethod === "paytm" ? "contained" : "outlined"}
            onClick={() => setPaymentMethod("paytm")}
          >
            Paytm
          </Button>
          <Button
            variant={paymentMethod === "card" ? "contained" : "outlined"}
            onClick={() => setPaymentMethod("card")}
          >
            Card
          </Button>
        </Box>

        {/* M-Pesa Section */}
        {paymentMethod === "mpesa" && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">M-Pesa Payment</Typography>
            <Typography sx={{ mb: 1 }}>
              Amount: US${priceUSD} (~ KES {priceKES})
            </Typography>
            <TextField
              label="M-Pesa Phone Number"
              fullWidth
              sx={{ mb: 2 }}
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ background: "#16a34a", mb: 2 }}
              onClick={initiateMpesaPayment}
            >
              Initiate Payment
            </Button>

            {paymentStatus === "failed" && (
              <Box>
                <TextField
                  label="Transaction Reference ID"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                <Button variant="outlined" onClick={checkTransaction}>
                  Check Payment
                </Button>
              </Box>
            )}
            {paymentStatus === "success" && (
              <Button
                variant="contained"
                sx={{ background: "#16a34a" }}
                onClick={() => handleConfirmPayment("mpesa")}
              >
                Confirm Payment
              </Button>
            )}
          </Box>
        )}

        {/* Binance Pay Section */}
        {paymentMethod === "binance" && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Binance Pay</Typography>
            <Typography>
              Scan the QR code using Binance App and pay{" "}
              <b>US${priceUSD}</b>.
            </Typography>
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/QR_code_for_mobile_English_Wikipedia.svg"
              alt="Binance Pay QR"
              sx={{ width: 200, my: 2 }}
            />
            <Button
              variant="contained"
              sx={{ background: "#f59e0b" }}
              onClick={handleBinancePayment}
            >
              I Have Paid
            </Button>
            {paymentStatus === "success" && (
              <Button
                variant="contained"
                sx={{ background: "#16a34a", ml: 2 }}
                onClick={() => handleConfirmPayment("binance")}
              >
                Confirm Payment
              </Button>
            )}
          </Box>
        )}

        {/* Paytm Section */}
        {paymentMethod === "paytm" && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Paytm</Typography>
            <Typography>Coming soon...</Typography>
          </Box>
        )}

        {/* Card Section */}
        {paymentMethod === "card" && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Card Payment</Typography>
            <TextField label="Card Number" fullWidth sx={{ mb: 2 }} />
            <TextField label="Expiry Date (MM/YY)" fullWidth sx={{ mb: 2 }} />
            <TextField label="CVV" fullWidth sx={{ mb: 2 }} />
            <Button
              variant="contained"
              sx={{ background: "#2563eb" }}
              onClick={handleCardPayment}
            >
              Save & Pay
            </Button>
            {paymentStatus === "success" && (
              <Button
                variant="contained"
                sx={{ background: "#16a34a", ml: 2 }}
                onClick={() => handleConfirmPayment("card")}
              >
                Confirm Payment
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
}
