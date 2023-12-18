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
import { ProductOrderDTO } from "../api/models";
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));

type ProductTableProps = {
  rows: ProductOrderDTO[];
  selectProduct(product: ProductOrderDTO): void;
  deleteProduct(product: ProductOrderDTO): void;
};

const ProductTable: React.FC<ProductTableProps> = ({
  rows,
  selectProduct,
  deleteProduct,
}) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Unit Price</TableCell>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Total Price</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Product.ID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.Product.ID}
              </TableCell>
              <TableCell align="center">{row.Product.Name}</TableCell>
              <TableCell align="center">{row.Product.UnitPrice}</TableCell>
              <TableCell align="center">{row.Qty}</TableCell>
              <TableCell align="center">{row.TotalPrice}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
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

export default ProductTable;
