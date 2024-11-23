"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextField from "@mui/material/TextField";
import { Grid2, IconButton, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "@/contexts/UserContext";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    broncoID: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const { login } = useUser();

  const handleShowPassword = () => setShowPassword((show) => !show);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  // Handle form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation: Check if all fields are filled
    const { broncoID, firstName, lastName, email, username, password } =
      registerForm;

    if (
      !broncoID ||
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password
    ) {
      toast.error("Please fill in all the fields!", {
        position: "top-center",
        autoClose: 3000, // 3 seconds before toast disappears
      });
      return; // Stop the function if validation fails
    }

    // Validation: Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    // Validation: Check if password is at least 8 characters long
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!", {
        position: "top-center",
        autoClose: 3000, // 3 seconds before toast disappears
      });
      return; // Stop the function if validation fails
    }

    // After validation, set isValidated to true
    setIsValidated(true);

    // Handle sign-up logic
    try {
      // console.log(registerForm);
      // TODO: Implement sign-up logic
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm), // Send the form data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        const { userID, token } = data;
        console.log("User ID:", userID);
        console.log("Token:", token);
        // Store the token in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userID", userID.toString());

        login(userID);

        setIsLoading(false);
        // Redirect to home page after successful sign-up
        router.push("/");

        toast.success("Sign-up successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        // Clear the form after successful sign-up using useRef
        setRegisterForm({
          broncoID: "",
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
        });
      } else {
        const data = await response.json();
        console.error(data.message);
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("An error occurred during sign-up", {
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
          <Card className="shadow-xl m-20 rounded-xl bg-white">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">Register</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <form className="space-y-4">
                <TextField
                  label="BroncoID"
                  variant="outlined"
                  fullWidth
                  name="broncoID"
                  value={registerForm.broncoID}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={registerForm.firstName}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={registerForm.lastName}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  value={registerForm.username}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  name="password"
                  value={registerForm.password}
                  onChange={handleChange}
                  required
                  helperText="Password must be at least 8 characters long."
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
              </form>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col w-full justify-center items-center gap-2">
                <Button
                  type="button"
                  onClick={handleSignup}
                  className="hover:bg-primary/90 text-white md:text-md lg:text-lg mt-4 w-full rounded-xl"
                >
                  {isValidated == true && isLoading ? (
                    <>
                      Creating your account...
                      <CircularProgress
                        color="inherit"
                        size={"1rem"}
                        sx={{
                          animation: "spin 1s linear infinite",
                        }}
                      />
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
                <p>
                  Already have an account?{" "}
                  <span>
                    <a className="underline text-link" href="/sign-in">
                      Sign in here
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
