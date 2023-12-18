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
import ProductDTO from "../src/api/models/Product";
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Stack = dynamic(() => import("@mui/material/Stack"));

type ProductTableProps = {
  rows: ProductDTO[];
  deleteProduct(product: ProductDTO): void;
};

const ProductTable: React.FC<ProductTableProps> = ({ rows, deleteProduct }) => {
  // return <h1>asdasd</h1>
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Unit Price</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ "&:last-child td, &:last-child th": { bproduct: 0 } }}
            >
              <TableCell component="th" scope="row"  align="center">
                {row.ID}
              </TableCell>
              <TableCell align="center">{row.Name}</TableCell>
              <TableCell align="center">{row.UnitPrice}</TableCell>
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
                    onClick={() => router.push(`/products/add-product/${row.ID}`)}
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
