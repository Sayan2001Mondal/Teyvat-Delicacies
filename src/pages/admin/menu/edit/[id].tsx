"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMenuItem, updateMenuItem, MenuType, NationType } from "@/hooks/services/menuservice";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box, Button, Container, Stack, TextField, Typography, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";

type FormValues = {
  name: string;
  description: string;
  type: MenuType;
  nation: NationType;
  price: number;
  imageUrl: string;
};

const TYPES: MenuType[] = ["Entree", "Main", "Dessert"];
const NATIONS: NationType[] = ["Mondstadt", "Liyue", "Inazuma", "Sumeru", "Fontaine", "Natlan"];

const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  type: yup.mixed<MenuType>().oneOf(TYPES).required("Type is required"),
  nation: yup.mixed<NationType>().oneOf(NATIONS).required("Nation is required"),
  price: yup.number().typeError("Price must be a number").positive().required("Price is required"),
  imageUrl: yup.string().url("Must be a valid URL").required("Image URL is required"),
});

export default function EditMenuItemPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const id = router.query.id as string;

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["menu-item", id],
    queryFn: async () => await getMenuItem(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        description: data.description,
        type: data.type,
        nation: data.nation,
        price: Number(data.price),
        imageUrl: data.imageUrl,
      });
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) => updateMenuItem(id, { ...values, price: Number(values.price) }),
    onSuccess: () => {
      toast.success("Menu item updated!");
      qc.invalidateQueries({ queryKey: ["menu-items"] });
      router.push("/admin/menu");
    },
    onError: (e: any) => toast.error(e?.message || "Update failed"),
  });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Menu Item
      </Typography>

      {isLoading ? (
        <Typography>Loading…</Typography>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField label="Name" fullWidth {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
            <TextField label="Description" multiline minRows={3} fullWidth {...register("description")} error={!!errors.description} helperText={errors.description?.message} />

            <FormControl fullWidth error={!!errors.type}>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                label="Type"
                value={watch("type") || ""}
                onChange={(e) => setValue("type", e.target.value as MenuType)}
              >
                {TYPES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl fullWidth error={!!errors.nation}>
              <InputLabel id="nation-label">Nation</InputLabel>
              <Select
                labelId="nation-label"
                label="Nation"
                value={watch("nation") || ""}
                onChange={(e) => setValue("nation", e.target.value as NationType)}
              >
                {NATIONS.map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
              </Select>
            </FormControl>

            <TextField label="Price" type="number" fullWidth {...register("price")} error={!!errors.price} helperText={errors.price?.message} />
            <TextField label="Image URL" fullWidth {...register("imageUrl")} error={!!errors.imageUrl} helperText={errors.imageUrl?.message} />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => router.push("/admin/menu")}>Cancel</Button>
              <Button variant="contained" type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Update"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
