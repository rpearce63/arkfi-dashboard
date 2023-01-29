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
  const [bonds, setBonds] = useState(false);
  const [nfts, setNfts] = useState(false);

  const handleBondsChange = () => {
    setBonds(!bonds);
    setIncludeBonds(!bonds);
  };

  const handlNftsChange = () => {
    setNfts(!nfts);
    setIncludeNfts(!nfts);
  };

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
      >
        Backup
      </Button>

      
        <FormControlLabel
          control={<Checkbox />}
          label="Include NFTs"
          onChange={setIncludeNfts}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Include Bonds"
          onChange={handleBondsChange}
        />
      </FormGroup>
    </div>
  );
};
