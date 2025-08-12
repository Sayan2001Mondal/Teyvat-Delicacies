import { Box, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Genshin Food App</title>
        <meta name="description" content="Order delicious Genshin Impact-inspired food from anywhere." />
      </Head>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", 
          backgroundImage: "url('/images/teyvat-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Stack spacing={3} sx={{ background: "rgba(255,255,255,0.8)", p: 4, borderRadius: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#5b4636" }}>
            Welcome to the Genshin Food App
          </Typography>
          <Typography variant="h6" sx={{ color: "#7a6a54" }}>
            Order your favorite dishes from Mondstadt, Liyue, Inazuma, and more — all in one place.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#d4af37",
                color: "#fff",
                "&:hover": { backgroundColor: "#c49b2f" },
              }}
              onClick={() => router.push("/menu")}
            >
              View Menu
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#d4af37",
                color: "#5b4636",
                "&:hover": { borderColor: "#c49b2f", backgroundColor: "#f8e1b5" },
              }}
              onClick={() => router.push("/about")}
            >
              Learn More
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
