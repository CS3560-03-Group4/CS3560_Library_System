"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCart } from "./CartContext";
import { Fine } from "@/components/profile/OverduePayment";

type UserContextType = {
  firstInitial: string;
  isAuthenticated: boolean;
  role: string;
  login: (userID: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [firstInitial, setFirstInitial] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [studentID, setStudentID] = useState<string>("");
  const { setCart } = useCart();

  useEffect(() => {
    const userID = localStorage.getItem("userID");

    if (!userID) {
      setIsAuthenticated(false);
      return;
    }

    if (role !== "STUDENT") return;

    // Get studentID by userID
    const getStudentID = async () => {
      try {
        const response = await fetch(`/api/user/${userID}`);
        const data = await response.json();

        if (!data) {
          throw new Error("Failed to fetch studentID");
        }

        setStudentID(data.studentID);
      } catch (error) {
        console.error("Error fetching studentID:", error);
      }
    };

    getStudentID();
  }, [role]);

  // INTERNAL EVENT: If any order is past the due date, set it to overdue
  useEffect(() => {
    if (!studentID) return;

    const checkOverdueOrdersAndCreateFines = async () => {
      try {
        // Fetch orders by studentID
        const response = await fetch(`/api/orders/${studentID}`);
        const data = await response.json();
        const orders = data.orders;

        // Check for overdue orders
        const overdueOrders = orders.filter((order: any) => {
          const dueDate = new Date(order.dueDate);
          const today = new Date();
          return dueDate < today && order.status !== "RETURNED";
        });

        if (overdueOrders.length === 0) {
          console.error("No overdue orders found");
          return; // Exit the function if no overdue orders found
        }

        // Update orders with overdue status
        const updatedOrderStatus = await Promise.all(
          overdueOrders.map(async (order: any) => {
            await fetch(`/api/order/${order.orderID}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "OVERDUE" }),
            });
          })
        );

        if (!updatedOrderStatus) {
          throw new Error("Failed to update order status");
        }

        // Check if fines exist for overdue orders
        const finesExist = await Promise.all(
          overdueOrders.map(async (order: any) => {
            const response = await fetch(`/api/fines/${studentID}`);
            const data = await response.json();
            const fines = data.fines;
            return fines.some((fine: Fine) => fine.orderID === order.orderID);
          })
        );

        if (finesExist.includes(true)) {
          console.error("Fines already exist for overdue orders");
          return; // Exit the function if fines already exist
        }

        // Create fines for overdue orders
        const createFines = await Promise.all(
          overdueOrders.map(async (order: any) => {
            await fetch(`/api/fines/${studentID}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                studentID: studentID,
                amount: 4,
                status: "UNPAID",
                orderID: order.orderID,
              }),
            });
          })
        );
        if (!createFines) {
          console.error("Failed to create fines");
        }
      } catch (error) {
        console.error("Error checking overdue orders:", error);
      }
    };

    checkOverdueOrdersAndCreateFines();
  }, [studentID, role]);

  // Fetch user information (e.g., first initial)
  const fetchUser = async (userID: string) => {
    try {
      const response = await fetch(`/api/user/${userID}`);
      const user = await response.json();
      if (user) {
        setFirstInitial(user.firstName.charAt(0).toUpperCase());
        setRole(user.role);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // On initial mount, check authentication and fetch user info
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userID = localStorage.getItem("userID");
    if (token && userID) {
      setIsAuthenticated(true);
      fetchUser(userID); // Fetch the user only if userID exists
    }
  }, []);

  const login = (userID: string) => {
    // Save userID in localStorage for persistence
    localStorage.setItem("userID", userID);

    // Set authenticated state
    setIsAuthenticated(true);

    // Fetch the user data immediately
    fetchUser(userID);
  };

  const logout = () => {
    localStorage.clear();
    setCart([]);
    setIsAuthenticated(false);
    setFirstInitial("");
  };

  // Memoize context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({ firstInitial, role, isAuthenticated, login, logout }),
    [firstInitial, isAuthenticated]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
