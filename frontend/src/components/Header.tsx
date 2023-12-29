import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Logo } from "./shared/Logo";
import { UseAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = UseAuth();
  return (
    <div>
      <AppBar
        sx={{
          bgcolor: "transparent",
          position: "static",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
          }}
        >
          <Logo />
          <div>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink
                  bg="#00fffc"
                  text="Go To Chat"
                  textColor="black"
                  to="/chat"
                />
                <NavigationLink
                  bg="#51538f"
                  text="LogOut"
                  textColor="white"
                  to="/"
                  onClick={auth.logout}
                />
              </>
            ) : (
              <>
                <NavigationLink
                  bg="#00fffc"
                  text="LogIn"
                  textColor="black"
                  to="/login"
                />
                <NavigationLink
                  bg="#51538f"
                  text="SignUp"
                  textColor="white"
                  to="/signup"
                />
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
