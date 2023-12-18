import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Autocomplete,
} from "@mui/material";
import { ProductOrderDTO } from "../api/models";
import ProductDTO from "../api/models/Product";
type CustomIProductOrder = Omit<ProductOrderDTO, "Product"> & {
  Product: ProductDTO | null;
};

type ProductFormProps = {
  onSubmit: SubmitHandler<CustomIProductOrder>;
  defaultValues: CustomIProductOrder;
  products: ProductDTO[];
};

const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  onSubmit,
  products,
}) => {
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues,
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box mt={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Selection */}
          <Box mb={2}>
            <Controller
              name="Product"
              control={control}
              rules={{ required: "Product is required" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  options={products}
                  getOptionLabel={(option) => option?.Name ?? ""}
                  onChange={(_, newValue) => {
                    setValue("Product", newValue);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.ID === value.ID
                  }
                  readOnly={!!getValues("Product")}
                  value={getValues("Product")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Product"
                      fullWidth
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : null
                      }
                    />
                  )}
                />
              )}
            />
          </Box>

          {/* Quantity Input */}
          <Box mb={2}>
            <Controller
              name="Qty"
              control={control}
              defaultValue={0}
              rules={{
                required: "Quantity is required",
                min: {
                  message: "At least one quantity is required",
                  value: 1,
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Quantity"
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

          <Button type="submit" variant="contained" color="primary">
            Confirm and Save
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProductForm;
