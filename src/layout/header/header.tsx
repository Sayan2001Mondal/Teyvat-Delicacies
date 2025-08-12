"use client";

import { AppBar, Toolbar, Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { account } from "@/hooks/utils/appwrite";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    account.get()
      .then((res) => setUser(res))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    toast.success("Logged out successfully");
    setUser(null);
    router.push("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2d1f4f" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left logo */}
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ textDecoration: "none", color: "#ffcf6c", fontWeight: "bold" }}
        >
          Genshin Food
        </Typography>

        {/* Middle links */}
        <Stack direction="row" spacing={4}>
          <Button component={Link} href="/menu" sx={{ color: "#ffcf6c" }}>Menu</Button>
          <Button component={Link} href="/about" sx={{ color: "#ffcf6c" }}>About</Button>
          <Button component={Link} href="/contact" sx={{ color: "#ffcf6c" }}>Contact</Button>
        </Stack>

        {/* Right side auth */}
        {user ? (
          <Button onClick={handleLogout} sx={{ color: "#ffcf6c" }}>
            Logout
          </Button>
        ) : (
          <Button component={Link} href="/login" sx={{ color: "#ffcf6c" }}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
