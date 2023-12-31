import { Box, Avatar, Typography } from "@mui/material";
import { UseAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = UseAuth();
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box
        sx={{
          maxWidth: "95%",
          overflow: "auto",
          // border: "2px solid red",
        }}
      >
        {!messageBlocks && (
          <Typography sx={{ fontSize: "16px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <div
                style={{
                  maxWidth: "85%",
                  overflow: "auto",
                  // borderRadius: "5%",
                  marginLeft: "15px",
                  height: "auto ",
                }}
              >
                <SyntaxHighlighter
                  style={coldarkDark}
                  language="javascript"
                  wrapLines={true}
                >
                  {block}
                </SyntaxHighlighter>
              </div>
            ) : (
              <Typography sx={{ fontSize: "16px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "16px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                lineProps={{ style: { paddingBottom: 8 } }}
                wrapLines={true}
                style={coldarkDark}
                language={block[0]}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "16px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
