"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductTable from "./ProductTable";
import OrderProductDialog from "./OrderProductDialog";
import ProductForm from "./ProductForm";
import RemoveProductModal from "./DialogConfimation";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import OrderDto from "../api/models/Order";
import ProductDTO, { ProductOrderDTO } from "../api/models/Product";

type OrderFormProps = {
  title: string;
  onSubmit: SubmitHandler<OrderDto>;
  defaultValues: OrderDto;
  products: ProductDTO[];
};

const OrderForm: React.FC<OrderFormProps> = ({
  title,
  products,
  onSubmit,
  defaultValues,
}) => {
  const { control, handleSubmit, getValues, setValue } = useForm<OrderDto>({
    defaultValues,
  });

  const [openDialog, setOpenProductFormDialog] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [openRemoveProductDialog, setOpenRemoveProductDialog] = useState(false);

  const handleClose = () => {
    setOpenProductFormDialog(false);
  };

  const handleClickOpen = () => {
    setOpenProductFormDialog(true);
    setSelectedProduct(null);
  };

  const [selectedProduct, setSelectedProduct] = useState<ProductOrderDTO | null>(
    null
  );

  const removeProduct = (product: ProductOrderDTO) => {
    const products = getValues("Products");
    setValue(
      "Products",
      products.filter((p) => p.Product.ID !== product.Product.ID)
    );
  };
  const addProduct = (product: ProductOrderDTO) => {
    const products = getValues("Products");

    const idx = products.findIndex((p) => p.Product.ID === product.Product.ID);
    if (idx === -1) {
      product.TotalPrice = product.Qty * product!.Product.UnitPrice;
      products.push(product);
    } else {
      products[idx].Qty = product.Qty;
      products[idx].TotalPrice =
        products[idx].Qty * products[idx]!.Product.UnitPrice;
    }

    setValue("Products", products);
  };
  const updateFinalPrice = (products: ProductOrderDTO[]) => {
    const amount = products.reduce(
      (prev, next) => prev + next.Qty * next.Product.UnitPrice,
      0
    );
    setValue("FinalPrice", +amount.toFixed(2));
    setToggle(!toggle);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box mt={4} width={"100%"}>
          <Typography variant="h4" align="center" gutterBottom>
            {title}
          </Typography>

          <Box
            onSubmit={handleSubmit(onSubmit)}
            component={"form"}
            width={"100%"}
          >
            <Box mb={2}>
              <Controller
                name="Order"
                control={control}
                rules={{ required: "Order code is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Order Code"
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    InputProps={{ readOnly: getValues("ID") !== "" }}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                  />
                )}
              />
            </Box>

            <Box mb={2}>
              <Controller
                name="Date"
                control={control}
                rules={{ required: "Date is required" }}
                render={() => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Controlled picker"
                      value={getValues("Date")}
                      format="dd/MM/yyyy"
                      readOnly={getValues("ID") !== ""}
                      onChange={(newValue) =>
                        setValue("Date", newValue as Date)
                      }
                    />
                  </LocalizationProvider>
                )}
              />
            </Box>

            <Box mb={2}>
              <Controller
                name="FinalPrice"
                control={control}
                rules={{ required: "Final Price is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    InputProps={{ readOnly: true }}
                    label="Final Price"
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                  />
                )}
              />
            </Box>
            <Box>
              <InputLabel>Products</InputLabel>
              <br />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="medium"
                onClick={handleClickOpen}
              >
                Add
              </Button>
              <br />
              <br />
              <ProductTable
                rows={getValues("Products")}
                selectProduct={(product) => {
                  setSelectedProduct(product);
                  setOpenProductFormDialog(true);
                }}
                deleteProduct={(product) => {
                  setSelectedProduct(product);
                  setOpenRemoveProductDialog(true);
                }}
              />
            </Box>
            <br />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
      <OrderProductDialog
        open={openDialog}
        onClose={handleClose}
        title={selectedProduct?.Product?.Name ?? "Add Product"}
      >
        <ProductForm
          defaultValues={
            selectedProduct ?? {
              Product: null,
              Qty: 0,
              TotalPrice: 0,
            }
          }
          products={products}
          onSubmit={(orderProduct) => {
            addProduct(orderProduct as ProductOrderDTO);
            setOpenProductFormDialog(false);
            updateFinalPrice(getValues("Products"));
          }}
        />
      </OrderProductDialog>
      <RemoveProductModal
        message="Are you sure you want to remove this product from the order?"
        onClose={() => setOpenRemoveProductDialog(false)}
        onConfirm={() => {
          if (!selectedProduct) return;
          removeProduct(selectedProduct);
          setOpenRemoveProductDialog(false);
          updateFinalPrice(getValues("Products"));
        }}
        open={openRemoveProductDialog}
      />
    </Container>
  );
};

export default OrderForm;
