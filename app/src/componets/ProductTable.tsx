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

import dynamic from "next/dynamic";
import { IProductOrder } from "../interfaces/Product";
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));

type ProducTableProps = {
  rows: IProductOrder[];
  selectProduct(product: IProductOrder): void;
  deleteProduct(product: IProductOrder): void;
};

const ProducTable: React.FC<ProducTableProps> = ({
  rows,
  selectProduct,
  deleteProduct,
}) => {
  // return <h1>asdasd</h1>
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Product.ID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Product.ID}
              </TableCell>
              <TableCell align="right">{row.Product.Name}</TableCell>
              <TableCell align="right">{row.Product.UnitPrice}</TableCell>
              <TableCell align="right">{row.Qty}</TableCell>
              <TableCell align="right">{row.TotalPrice}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => deleteProduct(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    aria-label="add an edit"
                    onClick={() => selectProduct(row)}
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

export default ProducTable;
