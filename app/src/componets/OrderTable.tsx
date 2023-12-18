"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import dynamic from "next/dynamic";
import { MenuItem, Select } from "@mui/material";
import OrderDto, { OrderStatus } from "../api/models/Order";
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));

type OrderTableProps = {
  rows: OrderDto[];
  deleteOrder(product: OrderDto): void;
  changeStatus(product: OrderDto): void;
};

const OrderTable: React.FC<OrderTableProps> = ({
  rows,
  deleteOrder,
  changeStatus,
}) => {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Order</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Products</TableCell>
            <TableCell align="center">Final Price</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="center">{row.Order}</TableCell>
              <TableCell align="center">
                {format(row.Date, "dd-MM-yyyy")}
              </TableCell>
              <TableCell align="center">
                {row.Products.map((p) => p.Product.Name).join(", ")}
              </TableCell>
              <TableCell align="center">{row.FinalPrice.toFixed(2)}</TableCell>
              <TableCell align="center">
                <Select
                  value={row.Status}
                  label="Age"
                  size="small"
                  disabled={row.Status === "Completed"}
                  onChange={(e) =>
                    changeStatus({
                      ...row,
                      Status: e.target.value as OrderStatus,
                    })
                  }
                >
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  <MenuItem value={"InProgress"}>In Progress</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => deleteOrder(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    // disabled={row.Status === "Completed"}
                    color="info"
                    aria-label="add an edit"
                    onClick={() => {
                      if (row.Status === "Completed") {
                        alert("You can't modify a completed order");
                        return;
                      }
                      router.push(`/add-order/${row.ID}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
