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
import { format } from "date-fns";

import dynamic from "next/dynamic";
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));

type OrderTableProps = {
  rows: IOrder[];
};

const OrderTable: React.FC<OrderTableProps> = ({ rows }) => {
  // return <h1>asdasd</h1>
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Products</TableCell>
            <TableCell align="right">Final Price</TableCell>
            <TableCell align="right">Options</TableCell>
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
              <TableCell align="right">{row.Order}</TableCell>
              <TableCell align="right">
                {format(row.Date, "dd-MM-yyyy")}
              </TableCell>
              <TableCell align="right">
                {row.Products.map((p) => p.Product.Name).join(", ")}
              </TableCell>
              <TableCell align="right">{row.FinalPrice}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="delete" color="error">
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
