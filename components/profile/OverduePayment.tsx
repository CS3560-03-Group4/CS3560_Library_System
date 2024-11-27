"use client";

import { formatDate } from "@/lib/utils";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Fine {
  fineID: string;
  orderID: string;
  amount: number;
  status: string;
  paymentDate?: string;
}

interface Payment {
  fineID?: string;
  studentID?: string;
  paymentMethod?: string;
  paymentDate?: string;
  accountNumber?: string;
  amount?: number;
}

export default function OverduePayment({ userID }: { userID: string }) {
  const [fineInfo, setFineInfo] = useState<Fine[]>([]);
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Get studentID by userID
    const getStudentID = async () => {
      try {
        const response = await fetch(`/api/user/${userID}`);
        const data = await response.json();
        setPayment({ ...payment, studentID: data.studentID });
      } catch (error) {
        console.error("Error fetching student ID:", error);
      }
    };

    getStudentID();
  }, [userID]);

  useEffect(() => {
    if (!payment?.studentID) {
      return;
    }
    const getFineInfo = async () => {
      try {
        const response = await fetch(`/api/fines/${payment?.studentID}`);
        const data = await response.json();
        const fines = data.fines;
        console.log(fines);
        setFineInfo(fines);
      } catch (error) {
        console.error("Error fetching fine info:", error);
      } finally {
        setLoading(false);
      }
    };

    getFineInfo();
  }, [payment?.studentID]);

  useEffect(() => {
    // Computer fine remaining amount from the list of unpaid fines
    const computeFineRemaining = (fines: Fine[]) => {
      let fineRemaining = 0;
      fines.forEach((fine) => {
        if (fine.status === "UNPAID") {
          fineRemaining += fine.amount;
        }
      });
      console.log(fineRemaining);
      setBalance(fineRemaining);
    };

    computeFineRemaining(fineInfo);
  }, [fineInfo]);

  const handleOpenDialog = (fine: Fine) => {
    setSelectedFine(fine);
  };

  const handleCloseDialog = () => {
    setSelectedFine(null);
    setPaymentMethod("");
    setAccountNumber("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!selectedFine) {
      console.error("No fine selected");
      return;
    }

    // Construct the payment object locally
    const newPayment: Payment = {
      fineID: selectedFine.fineID,
      studentID: payment?.studentID, // Use the current studentID from state
      paymentMethod,
      paymentDate: new Date().toLocaleDateString("en-CA"),
      amount: selectedFine.amount,
    };

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(newPayment),
      });

      if (!response.ok) {
        throw new Error("Failed to submit payment");
      }

      // If the payment is successful, update the fine status
      const updatedFine = await fetch(`/api/fine/${selectedFine.fineID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "PAID" }),
      });

      if (!updatedFine.ok) {
        throw new Error("Failed to update fine status");
      }

      // Update the fineInfo state
      setFineInfo((prev) =>
        prev.map((fine) =>
          fine.fineID === selectedFine.fineID
            ? {
                ...fine,
                status: "PAID",
                paymentDate: new Date().toLocaleDateString("en-CA"),
              }
            : fine
        )
      );

      toast.success("Payment submitted successful!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error submitting payment:", error);
    } finally {
      setIsSubmitting(false);
    }

    handleCloseDialog();
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <CircularProgress color="success" />
          <Typography sx={{ mt: 2 }}>Fetching overdue fines...</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            minHeight: "100vh",
            p: 2,
            gap: 2,
          }}
        >
          <h1 className="text-2xl font-bold">Balance: ${balance}</h1>
          {fineInfo.map((fine) => (
            <Box
              key={fine.orderID}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { sm: "space-between" },
                alignItems: "center",
                border: "1px solid #ccc",
                p: 2,
                gap: { xs: 1, sm: 0 },
                borderRadius: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                  }}
                >
                  Order ID:{" "}
                  <Typography component="span">{fine.orderID}</Typography>
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                  }}
                >
                  Amount:{" "}
                  <Typography component="span">${fine.amount}</Typography>
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                  }}
                >
                  Status:{" "}
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                    }}
                    className={`${
                      fine.status === "UNPAID"
                        ? "text-[#FF0000]"
                        : "text-[#00843D]"
                    }`}
                  >
                    {fine.status === "PAID" ? "Paid" : "Unpaid"}
                  </Typography>
                </Typography>
                {fine.status === "PAID" && (
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
                  >
                    Payment Date:{" "}
                    <Typography component="span">
                      {fine.paymentDate && formatDate(fine.paymentDate)}
                    </Typography>
                  </Typography>
                )}
              </Box>
              {fine.status === "UNPAID" && (
                <Button
                  variant="contained"
                  sx={{
                    alignSelf: {
                      xs: "center",
                      sm: "center",
                      background: "#00843D",
                    },
                  }}
                  onClick={() => handleOpenDialog(fine)}
                >
                  Pay
                </Button>
              )}
            </Box>
          ))}

          <Dialog
            open={Boolean(selectedFine)}
            onClose={handleCloseDialog}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              Payment for Order ID:
              <p className="font-normal">{selectedFine?.orderID}</p>
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
              >
                Amount: ${selectedFine?.amount}
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  label="Payment Method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Debit Card">Debit Card</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label={
                  paymentMethod.includes("Card")
                    ? "Card Number"
                    : paymentMethod === "Bank Transfer"
                    ? "Account Number"
                    : "Account/Card Number"
                }
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="error">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                disabled={!paymentMethod || !accountNumber}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
}
