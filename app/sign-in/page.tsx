"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Grid2 } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify"; // Assuming you use react-toastify for notifications

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signinForm, setSigninForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninForm({ ...signinForm, [name]: value });
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation: Check if all fields are filled
    const { username, password } = signinForm;

    if (!username || !password) {
      toast.error("Username and password are required!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      // Send a request to the server to authenticate
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      // Handle server response
      if (response.ok) {
        const data = await response.json();

        // Assuming the server returns the userID and token
        const { userID, token } = data;

        // Store userID and token in localStorage
        localStorage.setItem("userID", userID);
        localStorage.setItem("authToken", token);
        setIsLoading(false);
        // Navigate to the Home page
        router.push("/");
      } else {
        toast.error("Invalid credentials. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("An error occurred during sign-in. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <Grid2 container>
      {/* Left Banner */}
      <Grid2 size={{ xs: 12, md: 5 }}>
        <div className="h-screen bg-[#00843D] flex flex-col justify-center items-center gap-3">
          <img
            src="/lib_logo.jpg"
            alt="lib logo"
            className="rounded-full w-52 h-52 object-cover"
          />

          <h1 className="text-white text-4xl font-bold">Welcome to CPPLib</h1>
        </div>
      </Grid2>

      {/* Right Area with Form */}
      <Grid2 size={{ xs: 12, md: 7 }}>
        <div className="flex justify-center items-center h-screen">
          <Card className="shadow-xl m-10 rounded-xl">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <form className="space-y-4">
                <TextField
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={signinForm.username}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  value={signinForm.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </form>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col w-full justify-center items-center gap-2">
                <Button
                  type="button"
                  onClick={handleSignin}
                  className="hover:bg-primary/90 text-white md:text-md lg:text-lg mt-4 w-full rounded-xl"
                >
                  {isLoading == true ? "Signing In..." : "Sign In"}
                </Button>
                <p>
                  Don't have an account?{" "}
                  <span>
                    <a className="underline text-link" href="/sign-up">
                      Register here
                    </a>
                  </span>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Grid2>
    </Grid2>
  );
}
