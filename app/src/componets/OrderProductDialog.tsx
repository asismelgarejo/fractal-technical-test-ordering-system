"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ProductForm from "./ProductForm";
import { DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface OrderProductDialogProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

const OrderProductDialog: React.FC<OrderProductDialogProps> = (props) => {
  const { onClose, open, children, title } = props;
  return (
    <Dialog open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => onClose()}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default OrderProductDialog;
