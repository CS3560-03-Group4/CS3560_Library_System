"use client";

import { formatDate } from "@/lib/utils";
import { Warning } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderInfoProps = {
  orderID: string;
  userID: string;
  totalItems: string;
  orderDate: string;
  dueDate: string;
  status: string;
};
export default function OrderInfo({
  orderID,
  userID,
  totalItems,
  orderDate,
  dueDate,
  status,
}: OrderInfoProps) {
  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-xl">Order ID</h3>
          <p>{orderID}</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Order Date</h3>
          <p>{orderDate}</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Due Date</h3>
          <p>{dueDate}</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Total Item(s)</h3>
          <p>{totalItems}</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Status</h3>
          <div
            className={`mt-2 ${status === "ORDERED" ? "bg-[#00843d] " : ""}  ${
              status === "RECEIVED" ? "bg-[#29d2e4] " : ""
            }  ${status === "READY" ? "bg-[#2f57da] " : ""}  ${
              status === "BORROWED" ? "bg-[#3363e9] " : ""
            }   ${status === "OVERDUE" ? "bg-[#FFC107] " : ""}  ${
              status === "CANCELED" ? "bg-[#808080] " : ""
            } inline-block text-white rounded-xl`}
          >
            <p className="p-2 font-bold">{status}</p>
          </div>
        </div>
        {status === "OVERDUE" && (
          <div className="border mr-2 p-2 rounded-xl border-[#ec4637]">
            <Warning sx={{ fontSize: 30, color: "#FFC107", mr: 1 }} />
            <Typography variant="body1" color="text.secondary">
              Please go to{" "}
              <Link href={`/profile/${userID}`}>
                <span className="underline italic text-blue-500">
                  Your Profile
                </span>
              </Link>{" "}
              to pay the fine
            </Typography>
          </div>
        )}
      </div>
    </>
  );
}
