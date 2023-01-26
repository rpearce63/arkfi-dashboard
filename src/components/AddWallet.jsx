import React, {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export default ({addWallet}) => {
  
  const [address, setAddress] = useState('');
  const processAddress = () => {
    
    !!address && addWallet(address)
    setAddress('')
  }
  
  return (
    <>
    <Box sx={{backgroundColor: "lightgrey", padding: "10px "}}>
      <TextField
        id="add-wallet"
        label="Enter address"
        variant="outlined"
        sx={{ backgroundColor: "white", marginRight: "1em", width: "50ch" }}
        fullWidth
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <Button variant="contained" onClick={processAddress}>Add Wallet</Button>
   </Box> </>
  );
};
