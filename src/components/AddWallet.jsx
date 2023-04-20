import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default ({ addWallet }) => {
  const [address, setAddress] = useState("");

  const processAddress = () => {
    !!address && addWallet(address);
    setAddress("");
  };

  const loadFile = (event) => {
    console.log("loading wallets")
    event.target.files[0].text().then((t) => {
      console.log(t);
      localStorage.setItem("arkFiWallets", t);
    });
    window.location.reload(true);
  };
  
  const clearTable = () => {
    if (!window.confirm("This will clear your current list. Are you sure?"))
        return false;
    localStorage.clear();
    window.location.reload(true);
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "lightgrey",
          padding: "10px ",
          borderRadius: "5px",
          
        }}
      >
        
          <TextField
            size="small"
            id="add-wallet"
            label="Enter address"
            variant="outlined"
            sx={{
              backgroundColor: "white",
              marginRight: "1em",
              marginBottom: "1em",
              width: "55ch",
              borderRadius: "5px",
            }}
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        
          <Button
            variant="contained"
            size="small"
            onClick={processAddress}
            disabled={!address}
            sx={{marginRight: "1em"}}
          >
            Add Wallet
          </Button>
          <Button
            variant="outlined"
            component="label"
            size="small"
            color="success"
          >
            Load Backup
            <input type="file" hidden onChange={loadFile} />
          </Button>
        
        <Button
            variant="outlined"
            component="label"
            size="small"
            color="success"
            onClick={clearTable}
          >
            Clear Table
            
          </Button>
        
      </Box>{" "}
    </>
  );
};
