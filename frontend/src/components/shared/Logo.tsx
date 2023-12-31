import { Typography } from "@mui/material";

import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="openai.png"
          alt="OpenAi"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
      </Link>
      <Typography
        sx={{
          display: {
            md: "block",
            sm: "none",
            sx: "none",
          },
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span>MERN</span>-GPT
      </Typography>
    </div>
  );
};
