import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog({ handleResponse }) {
  const [open, setOpen] = React.useState(true);

  const handleAgree = () => {
    setOpen(false);
    handleResponse(true);
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
        <DialogTitle id="alert-dialog-title">{"Remove row?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove the selected row from the table.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAgree}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
