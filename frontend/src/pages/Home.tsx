import { Box } from "@mui/material";

import TypingAnim from "../components/typer/TypingAnim";
import NavigationLink from "../components/shared/NavigationLink";
import { UseAuth } from "../context/AuthContext";

const Home = () => {
  const auth = UseAuth();
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "500",
        }}
      >
        {auth?.user ? (
          <NavigationLink
            bg="red"
            text="Chat With AI 🤖"
            textColor="white"
            to="/chat"
          />
        ) : (
          <NavigationLink
            bg="red"
            text="LogIn to Chat With AI 🤖"
            textColor="white"
            to="/login"
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;
