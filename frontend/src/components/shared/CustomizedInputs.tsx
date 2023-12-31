import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInputs = (props: Props) => {
  return (
    <TextField
      name={props.name}
      label={props.label}
      type={props.type}
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      inputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
    />
  );
};

export default CustomizedInputs;
