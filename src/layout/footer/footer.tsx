import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "black",
        color: "#ff3d00",
        textAlign: "center",
        py: 4,
        mt: 4,
        borderTop: "2px solid white",
        fontFamily: `'Cinzel', serif`,
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, 
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          gap: 4,
        }}
      >
        {/* About Section */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h6" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>
            About FoodZone
          </Typography>
          <Typography variant="body2">
            Discover amazing recipes, connect with food lovers, and share your culinary adventures with our community.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h6" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="/menu" color="inherit" underline="hover">
              Browse Recipes
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Categories
            </Link>
            <Link href="#" color="inherit" underline="hover">
              My Favorites
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Profile
            </Link>
          </Box>
        </Box>

        {/* Contact & Social */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h6" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>
            Connect With Us
          </Typography>

          {/* Contact Info */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, mb: 1 }}
            >
              <Email sx={{ mr: 1, fontSize: 16 }} />
              contact@FoodZone.com
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, mb: 1 }}
            >
              <Phone sx={{ mr: 1, fontSize: 16 }} />
              +1 (555) 123-4567
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}
            >
              <LocationOn sx={{ mr: 1, fontSize: 16 }} />
              New York, NY
            </Typography>
          </Box>

          {/* Social Media Icons */}
         {/* Social Media Icons */}
<Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, gap: 1 }}>
  <IconButton
    color="inherit"
    href="https://www.facebook.com/"
    aria-label="Facebook"
    sx={{
      transition: "all 0.3s ease",
      "&:hover": {
        color: "#1877f2", // Facebook blue
        transform: "scale(1.1)",
      },
    }}
  >
    <Facebook />
  </IconButton>

  <IconButton
    color="inherit"
    href="https://x.com/"
    aria-label="Twitter"
    sx={{
      transition: "all 0.3s ease",
      "&:hover": {
        color: "#1da1f2", // Twitter blue
        transform: "scale(1.1)",
      },
    }}
  >
    <Twitter />
  </IconButton>

  <IconButton
    color="inherit"
    href="https://www.instagram.com/"
    aria-label="Instagram"
    sx={{
      transition: "all 0.3s ease",
      "&:hover": {
        color: "#e4405f", // Instagram pink
        transform: "scale(1.1)",
      },
    }}
  >
    <Instagram />
  </IconButton>
</Box>

        </Box>
      </Box>

      {/* Legal Links */}
      <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #333" }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Link href="#" color="inherit" underline="hover" variant="body2">
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" underline="hover" variant="body2">
            Terms of Service
          </Link>
          <Link href="#" color="inherit" underline="hover" variant="body2">
            Cookie Policy
          </Link>
          <Link href="#" color="inherit" underline="hover" variant="body2">
            Support
          </Link>
        </Box>

        {/* Copyright */}
        <Typography variant="body2">
          © {new Date().getFullYear()} FoodZone App by Sayan Mondal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
