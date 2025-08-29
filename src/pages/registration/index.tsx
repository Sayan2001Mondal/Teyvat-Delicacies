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
import { account, ID } from "@/hooks/utils/appwrite";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LoginIcon from "@mui/icons-material/Login";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const schema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await account.create(ID.unique(), data.email, data.password, data.name);
      toast.success("Registration successful! Welcome to FoodZone!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please try again.");
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
              border: "1px solid rgba(15, 118, 110, 0.2)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
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
                Join FoodZone!
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
              >
                Create your account to start ordering delicious meals
              </Typography>
            </Box>

            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ p: { xs: 3, sm: 4 } }}
            >
              <Stack spacing={3}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  label="Full Name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#0f766e" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#0f766e" },
                      "&.Mui-focused fieldset": { borderColor: "#0f766e" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#0f766e" },
                  }}
                />

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
                        <EmailIcon sx={{ color: "#0f766e" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#0f766e" },
                      "&.Mui-focused fieldset": { borderColor: "#0f766e" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#0f766e" },
                  }}
                />

                {/* Password Fields Row */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 3, sm: 2 }}>
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
                            size="small"
                          >
                            {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#0f766e" },
                        "&.Mui-focused fieldset": { borderColor: "#0f766e" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#0f766e" },
                    }}
                  />

                  {/* Confirm Password Field */}
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VerifiedUserIcon sx={{ color: "#0f766e" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            disabled={isLoading}
                            size="small"
                          >
                            {showConfirmPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#0f766e" },
                        "&.Mui-focused fieldset": { borderColor: "#0f766e" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#0f766e" },
                    }}
                  />
                </Stack>

                {/* Register Button */}
                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                  startIcon={<PersonAddIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
                    color: "white",
                    py: 1.5,
                    borderRadius: "30px",
                    fontWeight: 700,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 20px rgba(15, 118, 110, 0.3)",
                    },
                    "&:disabled": {
                      background: "rgba(15, 118, 110, 0.5)",
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                {/* Divider */}
                <Divider sx={{ my: 2, color: "text.secondary" }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?
                  </Typography>
                </Divider>

                {/* Login Link */}
                <Button
                  component={Link as any}
                  href="/login"
                  fullWidth
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: "#fb7185",
                    borderColor: "#fb7185",
                    py: 1.25,
                    borderRadius: "30px",
                    fontWeight: 600,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#fb7185",
                      background: "rgba(251, 113, 133, 0.05)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Sign In Instead
                </Button>
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
                By creating an account, you agree to our{" "}
                <Typography
                  component="span"
                  sx={{ color: "#fb7185", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                >
                  Terms of Service
                </Typography>{" "}
                and{" "}
                <Typography
                  component="span"
                  sx={{ color: "#fb7185", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
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
