"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenuItem, listMenuItems } from "@/hooks/utils/services/menuservice";
import { toast } from "sonner";
import { useRouter } from "next/router";
import {
  Box, Button, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Stack
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function MenuAdminList() {
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["menu-items"],
    queryFn: async () => (await listMenuItems()).documents,
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteMenuItem(id),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["menu-items"] });
    },
    onError: (e: any) => toast.error(e?.message || "Delete failed"),
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Menu Items</Typography>
        <Button variant="contained" component={Link} href="/admin/menu/create">+ Add Item</Button>
      </Stack>

      {isLoading && <Typography>Loading…</Typography>}
      {isError && <Typography color="error">Failed to load items</Typography>}

      {!isLoading && !isError && (
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Nation</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((doc: any) => (
                <TableRow key={doc.$id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.nation}</TableCell>
                  <TableCell sx={{ maxWidth: 360 }}>{doc.description}</TableCell>
                  <TableCell>₹ {Number(doc.price).toFixed(2)}</TableCell>
                  <TableCell>
                    {doc.imageUrl ? (
                      <Image src={doc.imageUrl} alt={doc.name} height={64} width={64} style={{ objectFit: "cover", borderRadius: 8 }} />
                    ) : "—"}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button size="small" component={Link} href={`/admin/menu/edit/${doc.$id}`}>Edit</Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => del.mutate(doc.$id)}
                        disabled={del.isPending}
                      >
                        {del.isPending ? "Deleting..." : "Delete"}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {(!data || data.length === 0) && (
                <TableRow>
                  <TableCell colSpan={7} align="center">No items yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      )}
    </Container>
  );
}
