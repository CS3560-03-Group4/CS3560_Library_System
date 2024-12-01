"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Grid2, IconButton, InputAdornment, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify"; // Assuming you use react-toastify for notifications
import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@/contexts/UserContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [signinForm, setSigninForm] = useState({
    username: "",
    password: "",
  });

  const { login } = useUser();

  const handleShowPassword = () => setShowPassword((show) => !show);

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

    // After validation, set isValidated to true
    setIsValidated(true);

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

        // Call login() from UserContext to update context values immediately
        login(userID);

        // Navigate to the Checkout page (or specified by redirectUrl) after successful sign-in
        const redirectUrl = localStorage.getItem("redirectUrl");
        // console.log(redirectUrl);
        if (redirectUrl) {
          router.push(redirectUrl);
          return;
        }

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid2 container>
      {/* Left Banner */}
      <Grid2
        size={{ xs: 12, md: 5 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
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
        <div className="flex justify-center items-center h-screen bg-[#00843D] lg:bg-transparent">
          <Card className="shadow-xl m-5 md:m-10 rounded-xl bg-white">
            <CardHeader>
              <p className="lg:hidden text-xl md:text-3xl font-bold">
                Welcome to CPPLib!
              </p>
              <CardTitle className="text-4xl font-bold">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <form className="space-y-4" onSubmit={handleSignin}>
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
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  name="password"
                  value={signinForm.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? "hide the password"
                                : "display the password"
                            }
                            edge="end"
                            onClick={handleShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button
                  type="submit"
                  className="hover:bg-primary/90 text-white md:text-md lg:text-lg mt-4 w-full rounded-xl"
                >
                  {isValidated && isLoading ? (
                    <>
                      Signing In...
                      <CircularProgress
                        color="inherit"
                        size={"1rem"}
                        sx={{
                          animation: "spin 1s linear infinite",
                        }}
                      />
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="mt-4 flex flex-col w-full justify-center items-center gap-2">
                <p className="text-sm md:text-lg">
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
