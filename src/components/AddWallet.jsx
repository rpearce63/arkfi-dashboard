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
    event.target.files[0].text().then((t) => {
      console.log(t);
      localStorage.setItem("arkFiWallets", t);
    });
    window.location.reload(true);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "lightgrey",
          padding: "10px ",
          borderRadius: "5px",
        }}
      >
        <Stack spacing={2} direction="row">
          <TextField
            size="small"
            id="add-wallet"
            label="Enter address"
            variant="outlined"
            sx={{
              backgroundColor: "white",
              marginRight: "1em",
              width: "55ch",
              borderRadius: "5px",
            }}
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={processAddress}
            disabled={!address}
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
        </Stack>
      </Box>{" "}
    </>
  );
};
