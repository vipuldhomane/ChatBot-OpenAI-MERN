import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { UseAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import {
  clearConversation,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string | undefined;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatBoxRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  // import the context of auth
  const auth = UseAuth();
  console.log(auth);

  // if (localStorage.getItem("token")) {
  //   toast.loading("Loading Chats,", { id: "loadchats" });
  //   console.log("inside layout effect");

  //   getUserChats()
  //     .then((data) => {
  //       console.log(data);

  //       setChatMessages([...data.chats]);
  //       toast.success("Successfully loaded Chats,", { id: "loadchats" });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("Loading Failed", { id: "loadchats" });
  //     });
  // }

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats,", { id: "loadchats" });
      console.log("inside layout effect");

      getUserChats()
        .then((data) => {
          console.log(data);

          setChatMessages([...data.chats]);
          toast.success("Successfully loaded Chats,", { id: "loadchats" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    // call the api for openai
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleClearConversation = async () => {
    try {
      toast.loading("Deleting Chats,", { id: "deletechats" });
      await clearConversation();
      setChatMessages([]);
      toast.success("Chats deleted successfully,", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Error in Deleting Chats,", { id: "deletechats" });
    }
  };

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);
  return (
    // the parent div
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            border: "2px solid gray",
            display: "flex",
            height: "auto",
            width: "100%",
            // height: "60vh",
            bgcolor: "rgb(17, 29, 39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
            py: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "white",
              mb: 2,
              mx: "auto",
              fontWeight: "700",
            }}
          >
            Model - GPT 3.5 Turbo
          </Typography>
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {/* this condition might crash the app if name does not contain two letters */}
            {/* {auth?.user?.name} */}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[600],
              ":hover": {
                bgcolor: red[800],
              },
            }}
            onClick={handleClearConversation}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
          height: "80vh",
          maxWidth: "80vw",
        }}
      >
        <Box
          ref={chatBoxRef}
          sx={{
            width: "100%",
            height: "75vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
          className="syntax-highlighted-element"
          style={{ overflowX: "auto", whiteSpace: "pre-wrap" }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-expect-error for the role
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            required
            placeholder="Explore your Curiosity !!!!"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ color: "white", mx: 1, width: "auto" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
