import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { account } from "@/hooks/utils/appwrite";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Link from "next/link";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await account.createEmailPasswordSession(data.email, data.password);
      toast.success("Login successful");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 8 }}>
        <Typography variant="h5" align="center" mb={3}>Login</Typography>
        <TextField fullWidth label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} margin="normal" />
        <TextField fullWidth label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} margin="normal" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
        <Link href="/registration">Register here</Link>
      </Box>
    </Container>
  );
}
