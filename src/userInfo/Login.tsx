import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Snackbar,
} from "@mui/material";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "../contexts/AppContext";

export default function Login() {
  const { token, fetchData, updateData, ...data } = useContext(AppContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  async function loginHandler(e: FormEvent) {
    e.preventDefault();
    const { email, password } = userData;

    if (!email || !password) {
      setError(true);
      return null;
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASEURL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    const resData = await response.json();
    if (resData.error) {
      setError(true);

      return null;
    } else {
      updateData({ ...data, accessToken: resData.accessToken });
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
      <form
        style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
        onSubmit={loginHandler}
      >
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="email"
            required
            onChange={(event) => {
              setUserData((prev) => {
                return { ...prev, email: event.target.value };
              });
            }}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            aria-describedby="my-helper-text"
            type="password"
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </FormControl>

        <Button variant="contained" sx={{ width: "150px" }} type="submit">
          Login
        </Button>
        <Link to={`/signup`}>
          <Button
            variant="outlined"
            sx={{ width: "150px", fontSize: "10px" }}
            type="button"
          >
            Create account
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
