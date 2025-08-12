import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { account, ID } from "@/hooks/utils/appwrite";
import { toast } from "sonner";
import { useRouter } from "next/router";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
});

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await account.create(ID.unique(), data.email, data.password, data.name);
      toast.success("Registration successful");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 8 }}>
        <Typography variant="h5" align="center" mb={3}>Register</Typography>
        <TextField fullWidth label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} margin="normal" />
        <TextField fullWidth label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} margin="normal" />
        <TextField fullWidth label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} margin="normal" />
        <TextField fullWidth label="Confirm Password" type="password" {...register("confirmPassword")} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} margin="normal" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Register</Button>
      </Box>
    </Container>
  );
}
