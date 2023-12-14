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
};

const RemoveProductModal: React.FC<RemoveProductModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this product from the order?
        </DialogContentText>
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
