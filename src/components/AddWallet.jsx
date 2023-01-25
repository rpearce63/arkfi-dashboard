import React, {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export default () => {
  
  const [address, setAddress] = useState();
  
  return (
    <Box sx={{backgroundColor: "lightgrey", padding: "10px "}}>
      <TextField
        id="add-wallet"
        label="Enter address"
        variant="outlined"
        sx={{ backgroundColor: "white", marginRight: "1em" }}
        onChange={e => setAddress(e.target.value)}
      />
      <Button variant="contained">Contained</Button>
    </Box>
  );
};
