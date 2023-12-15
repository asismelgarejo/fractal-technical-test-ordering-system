"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IOrder from "@/app/src/interfaces/Order";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";

import dynamic from "next/dynamic";
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));

type OrderTableProps = {
  rows: IOrder[];
  deleteOrder(product: IOrder): void;
};

const OrderTable: React.FC<OrderTableProps> = ({ rows, deleteOrder }) => {
  // return <h1>asdasd</h1>
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
              <TableCell align="center">{row.FinalPrice}</TableCell>
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
                    color="info"
                    aria-label="add an edit"
                    onClick={() => router.push(`/add-order/${row.ID}`)}
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
