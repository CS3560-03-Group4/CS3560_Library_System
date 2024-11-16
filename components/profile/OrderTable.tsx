"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import OrderDetailsDialog from "./OrderDetailsDialog";

interface Order {
  orderID: string;
  orderItems: string[];
  orderDate: string;
  dueDate: string;
}
const orders = [
  {
    orderID: "O215-387-868-8768",
    orderItems: [
      "Harry Potter and the Philosopher 's Stone",
      "Soul Screamers 2: My Soul to Save",
    ],
    orderDate: "11/10/2024",
    dueDate: "11/18/2024",
  },
  {
    orderID: "O220-437-838-8534",
    orderItems: ["Soul Screamers 1: My Soul to Take"],
    orderDate: "11/01/2024",
    dueDate: "11/09/2024",
  },
];

export default function OrderTable() {
  const [open, setOpen] = useState<boolean>(false);
  const [orderID, setOrderID] = useState<string>("");

  const handleClickOpen = (orderID: string) => {
    setOrderID(orderID);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "#00843D" }}>
            <TableRow>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="left"
              >
                Order ID
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="left"
              >
                Book Item(s)
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="left"
              >
                Order Date
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="left"
              >
                Due Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.orderID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell width={"200"} component="th" scope="row">
                  {order.orderID}
                </TableCell>
                <TableCell width={"430"} align="left">
                  <div className="flex justify-between">
                    <div className="flex items-center w-60">
                      <p className="truncate">{order.orderItems[0]}</p>
                    </div>
                    <div>
                      {order.orderItems.length > 1 && (
                        <Button
                          variant="contained"
                          onClick={() => handleClickOpen(order.orderID)}
                        >
                          See Details
                        </Button>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell align="left">{order.orderDate}</TableCell>
                <TableCell align="left">{order.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderDetailsDialog
        orderID={orderID}
        orderItems={
          orders.find((order) => order.orderID === orderID)?.orderItems || []
        }
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
