import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
interface Props {
  open: boolean;
  setOpen: (vlaue: boolean) => void;
  title: string;
  callback: () => void;
}
function DeleteDialog({ open, setOpen, callback, title }: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>This action cann&rsquo;t be undone</Typography>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={callback}>
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
