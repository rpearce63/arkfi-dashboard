import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default ({
  handleSwitch,
  backupData,
  setIncludeNfts,
  setIncludeBonds,
}) => {
  

  return (
    <div className="controls">
      <span className="ml-1 inter-bold">ARK</span>
      <Switch onChange={handleSwitch} />
      <span className="inter-bold mr-1">USD</span>

      <Button
        variant="outlined"
        size="small"
        color="success"
        startIcon={<FileDownloadIcon color="success" />}
        onClick={backupData}
        sx={{marginRight: "1em"}}
      >
        Backup
      </Button>

      
        <FormControlLabel
          control={<Checkbox onChange={setIncludeNfts}/>}
          label="Include NFTs"
          
        />
        <FormControlLabel
          control={<Checkbox onChange={setIncludeBonds}/>}
          label="Include Bonds"
          
        />
      
    </div>
  );
};
