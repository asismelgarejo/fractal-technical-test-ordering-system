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
} from "@mui/material";

import ProductDTO from "../../../src/api/models/Product";

type ProductFormProps = {
  title: string;
  onSubmit: SubmitHandler<ProductDTO>;
  defaultValues: ProductDTO;
};

const ProductForm: React.FC<ProductFormProps> = ({
  title,
  onSubmit,
  defaultValues,
}) => {
  const { control, handleSubmit } = useForm<ProductDTO>({
    defaultValues,
  });

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
                name="Name"
                control={control}
                rules={{ required: "Product name is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Name"
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

            <Box mb={2}>
              <Controller
                name="UnitPrice"
                control={control}
                rules={{
                  required: "Unit Price is required",
                  min: {
                    message: "The price must be greater than cero",
                    value: 1,
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Unit Price"
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
            <br />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductForm;
