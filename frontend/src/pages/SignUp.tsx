import { Box, Button, Typography } from "@mui/material";
import { IoIosLogIn } from "react-icons/io";
import CustomizedInputs from "../components/shared/CustomizedInputs";
import { UseAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SignUp = () => {
  // using contextAPI
  const auth = UseAuth();
  const navigate = useNavigate();

  // Action on form submit. Parse the form data and set it into the state
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      // call the fun to set the local state managed by context api
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("error in SignUp", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              SignUp
            </Typography>
            <CustomizedInputs label="Name" name="name" type="text" />
            <CustomizedInputs label="Email" name="email" type="email" />
            <CustomizedInputs
              label="Password"
              name="password"
              type="password"
            />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
            >
              SignUp <IoIosLogIn />
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
