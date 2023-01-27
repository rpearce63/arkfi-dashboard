import React from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default ({handleSwitch, backupData}) => {
  
  return (
  <div className="controls">
      <span className="ml-1 inter-bold">ARK</span>
      <Switch onChange={handleSwitch}/>
      <span className="inter-bold mr-1">USD</span>
      
      <Button 
        variant="outlined" 
        size="small" 
        color="success"
        startIcon={<FileDownloadIcon 
        color="success"/>}
        onClick={backupData}>Backup</Button>
    </div>
  )
}