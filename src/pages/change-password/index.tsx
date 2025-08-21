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
  Container,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Client, Account, AppwriteException } from "appwrite";
import { toast } from "sonner";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Icons
import LockResetIcon from "@mui/icons-material/LockReset";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SecurityIcon from "@mui/icons-material/Security";

// ✅ Appwrite setup
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

const account = new Account(client);

interface PasswordVisibility {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

export default function ChangePassword() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<PasswordVisibility>({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/\d/.test(password)) errors.push("One number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("One special character");
    return errors;
  };

  const passwordErrors = newPassword ? validatePassword(newPassword) : [];
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== "";

  const handleChangePassword = async () => {
    setError("");

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    if (passwordErrors.length > 0) {
      setError("Please ensure your new password meets all requirements");
      return;
    }

    if (newPassword === oldPassword) {
      setError("New password must be different from your current password");
      return;
    }

    try {
      setLoading(true);
      await account.updatePassword(newPassword, oldPassword);
      toast.success("Password updated successfully!");
      
      // Clear form
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // Redirect after success
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error) {
      const appwriteError = error as AppwriteException;
      console.error("Password change error:", appwriteError);
      
      // Handle specific Appwrite errors
      if (appwriteError.code === 401) {
        setError("Current password is incorrect");
      } else if (appwriteError.code === 400) {
        setError("Invalid password format");
      } else {
        setError(appwriteError?.message || "Failed to update password");
      }
      toast.error(appwriteError?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = oldPassword && newPassword && confirmPassword && 
                     passwordErrors.length === 0 && passwordsMatch;

  return (
    <>
      <Head>
        <title>Change Password | FoodZone</title>
        <meta name="description" content="Change your FoodZone account password securely" />
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #ff3d00 0%, #ff6333 100%)",
          display: "flex",
          alignItems: "center",
          py: { xs: 4, sm: 6 },
        }}
      >
        <Container maxWidth="sm">
          {/* Back Button */}
          <Box sx={{ mb: 3 }}>
            <Button
              component={Link}
              href="/profile"
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }
              }}
            >
              Back to Profile
            </Button>
          </Box>

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              overflow: "hidden",
              background: "white",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #ff3d00 0%, #ff6333 100%)",
                color: "white",
                p: 4,
                textAlign: "center",
              }}
            >
              <SecurityIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight={700}
                gutterBottom
              >
                Change Password
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Keep your account secure with a strong password
              </Typography>
            </Box>

            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ mb: 3, borderRadius: 2 }}
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              )}

              <Stack spacing={3}>
                {/* Current Password */}
                <TextField
                  label="Current Password"
                  type={showPassword.current ? "text" : "password"}
                  fullWidth
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff3d00",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff3d00",
                      }
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#ff3d00",
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("current")}
                          edge="end"
                        >
                          {showPassword.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* New Password */}
                <TextField
                  label="New Password"
                  type={showPassword.new ? "text" : "password"}
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="outlined"
                  error={newPassword !== "" && passwordErrors.length > 0}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff3d00",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff3d00",
                      }
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#ff3d00",
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("new")}
                          edge="end"
                        >
                          {showPassword.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Password Requirements */}
                {newPassword && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Password Requirements:
                    </Typography>
                    <Stack spacing={0.5}>
                      {[
                        { text: "At least 8 characters", valid: newPassword.length >= 8 },
                        { text: "One uppercase letter", valid: /[A-Z]/.test(newPassword) },
                        { text: "One lowercase letter", valid: /[a-z]/.test(newPassword) },
                        { text: "One number", valid: /\d/.test(newPassword) },
                        { text: "One special character", valid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
                      ].map((req, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{
                            color: req.valid ? "#4caf50" : "#f44336",
                            fontSize: "0.875rem",
                          }}
                        >
                          {req.valid ? "✓" : "✗"} {req.text}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Confirm Password */}
                <TextField
                  label="Confirm New Password"
                  type={showPassword.confirm ? "text" : "password"}
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  error={confirmPassword !== "" && !passwordsMatch}
                  helperText={
                    confirmPassword !== "" && !passwordsMatch
                      ? "Passwords do not match"
                      : confirmPassword !== "" && passwordsMatch
                      ? "Passwords match ✓"
                      : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff3d00",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff3d00",
                      }
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#ff3d00",
                    },
                    "& .MuiFormHelperText-root": {
                      color: passwordsMatch ? "#4caf50" : "#f44336",
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("confirm")}
                          edge="end"
                        >
                          {showPassword.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Submit Button */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading || !isFormValid}
                  onClick={handleChangePassword}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockResetIcon />}
                  sx={{
                    backgroundColor: "#ff3d00",
                    borderRadius: 3,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(255, 61, 0, 0.3)",
                    "&:hover": {
                      backgroundColor: "#e53600",
                      boxShadow: "0 6px 16px rgba(255, 61, 0, 0.4)",
                    },
                    "&:disabled": {
                      backgroundColor: "#ccc",
                      boxShadow: "none",
                    }
                  }}
                >
                  {loading ? "Updating Password..." : "Update Password"}
                </Button>
              </Stack>

              {/* Security Tips */}
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Security Tips:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Use a unique password that you don't use elsewhere<br />
                  • Consider using a password manager<br />
                  • Don't share your password with anyone<br />
                  • Change your password regularly
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}