"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { account } from "@/hooks/utils/appwrite";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const schema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(data.email, data.password);
      toast.success("Login successful! Welcome!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background Image with Blur */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("/images/steak-frites.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          transform: "scale(1.1)",
          zIndex: -1,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: -1,
        }}
      />

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 0 },
          }}
        >
          <Paper
            elevation={24}
            sx={{
              width: "100%",
              maxWidth: 450,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 61, 0, 0.2)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: "linear-gradient(180deg, #0f766e 0%, #14b8a6 100%)",
                color: "white",
                py: { xs: 3, sm: 4 },
                textAlign: "center",
              }}
            >
              <RestaurantIcon sx={{ fontSize: { xs: 35, sm: 40 }, mb: 1 }} />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight={800}
                gutterBottom
              >
                Welcome!
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
              >
                Sign in to your FoodZone account
              </Typography>
            </Box>

            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ p: { xs: 3, sm: 4 } }}
            >
              <Stack spacing={3}>
                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0f766e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0f766e",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0f766e",
                    },
                  }}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#0f766e" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          disabled={isLoading}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0f766e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0f766e",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0f766e",
                    },
                  }}
                />

                {/* Login Button */}
                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  startIcon={<LoginIcon />}
                  sx={{
                    background: "linear-gradient(180deg, #0f766e 0%, #14b8a6 100%)",
                    color: "white",
                    py: 1.5,
                    borderRadius: "30px",
                    fontWeight: 700,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(180deg, #0f766e 0%, #14b8a6 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 20px rgba(255, 61, 0, 0.3)",
                    },
                    "&:disabled": {
                      background: "rgba(255, 61, 0, 0.5)",
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>

                {/* Divider */}
                <Divider sx={{ my: 2, color: "text.secondary" }}>
                  <Typography variant="body2" color="text.secondary">
                    New to FoodZone?
                  </Typography>
                </Divider>

                {/* Register Link */}
                <Button
                  component={Link as any}
                  href="/registration"
                  fullWidth
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    color: "#0f766e",
                    borderColor: "#0f766e",
                    py: 1.25,
                    borderRadius: "30px",
                    fontWeight: 600,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#0f766e",
                      background: "rgba(255, 61, 0, 0.05)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Create New Account
                </Button>

                {/* Forgot Password Link */}
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Typography
                    component={Link as any}
                    href="/forgot-password"
                    variant="body2"
                    sx={{
                      color: "#0f766e",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#0f766e",
                      },
                    }}
                  >
                    Forgot your password?
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                background: "#f5f5f5",
                py: 2,
                px: { xs: 3, sm: 4 },
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                By signing in, you agree to our{" "}
                <Typography
                  component="span"
                  sx={{ color: "#0f766e", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                >
                  Terms of Service
                </Typography>{" "}
                and{" "}
                <Typography
                  component="span"
                  sx={{ color: "#0f766e", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                >
                  Privacy Policy
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}