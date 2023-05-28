import Layout from "@/components/Layout";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
const SignIn = () => {
  return (
    <Layout title={"POS - SignIn"}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          className="signinBtn"
          variant="contained"
          onClick={() => {
            signIn("google", { callbackUrl: "/backoffice" });
          }}
        >
          SignIn with Google
        </Button>
      </Box>
    </Layout>
  );
};
export default SignIn;
