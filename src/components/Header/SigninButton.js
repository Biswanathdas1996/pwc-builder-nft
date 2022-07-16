import React from "react";
import "./HeaderStyles.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SigninButton({ children, ...restProps }) {
  let history = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        size="large"
        sx={{
          marginX: "15px",
          marginBottom: "15px",
        }}
        onClick={() => history("/profile")}
        // style={{
        //   border: "2px solid #1976d2",
        //   fontSize: 16,
        //   padding: "17px 24px",
        //   borderRadius: 12,
        // }}
      >
        Account
      </Button>
    </div>
  );
}

export default SigninButton;
