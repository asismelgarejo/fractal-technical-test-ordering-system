import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type RemoveProductModalProps = {
  open: boolean;
  onClose(): void;
  onConfirm(): void;
  message: string;
};

const RemoveProductModal: React.FC<RemoveProductModalProps> = ({
  open,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove Product</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveProductModal;
