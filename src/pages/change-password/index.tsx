"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { Client, Account } from "appwrite";
import { toast } from "sonner";

// ✅ Appwrite setup
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Your Appwrite API endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string); // Your project ID

const account = new Account(client);

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await account.updatePassword(newPassword, oldPassword);
      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          p: 3,
          maxWidth: 420,
          width: "100%",
          borderRadius: 3,
          bgcolor: "rgba(255, 165, 0, 0.1)", // subtle orange tint
          boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", color: "orange", fontWeight: "bold" }}
          >
            Change Password
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleChangePassword}
              sx={{
                bgcolor: "orange",
                "&:hover": { bgcolor: "#e69500" },
                fontWeight: "bold",
              }}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
