import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Button,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";
import React, { FormEvent, useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignUp() {
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  async function signUpHandler(e: FormEvent) {
    e.preventDefault();
    const { name, email, password } = userData;
    if (!name || !email || !password) {
      setError(true);
      return null;
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASEURL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    let data = await response.json();
    if (data) {
      router.push("/auth/login");
    } else {
      setError(true);
    }
  }
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        <FormControl>
          <InputLabel htmlFor="name">User Name</InputLabel>
          <Input
            id="name"
            aria-describedby="my-helper-text"
            type="text"
            required
            onChange={(event) =>
              setUserData((prev) => {
                return { ...prev, name: event.target.value };
              })
            }
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="email"
            required
            onChange={(event) =>
              setUserData((prev) => {
                return { ...prev, email: event.target.value };
              })
            }
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            aria-describedby="my-helper-text"
            type="password"
            required
            onChange={(event) =>
              setUserData((prev) => {
                return { ...prev, password: event.target.value };
              })
            }
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{ width: "150px" }}
          type="submit"
          onClick={signUpHandler}
        >
          Sign Up
        </Button>
        <Link href={`/login`}>
          <Button variant="outlined" sx={{ width: "150px" }}>
            Login
          </Button>
        </Link>
      </form>
      <Box>
        <Snackbar
          open={error}
          autoHideDuration={2000}
          onClose={handleClose}
          action={action}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Alert severity="error">Something Went Wrong!</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
