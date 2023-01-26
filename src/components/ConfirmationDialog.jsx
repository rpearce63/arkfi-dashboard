import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog({ isOpen, handleResponse}) {
  const [open, setOpen] = React.useState(isOpen);

  const handleAgree = () => {
    setOpen(false);
    handleResponse(true)
  };

  const handleCancel = () => {
    setOpen(false);
    handleResponse(false);
  };

  return (
    <div>
      
      <Dialog
        open={open}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove row?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove the selected row from the table.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}