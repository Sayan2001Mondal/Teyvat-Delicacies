import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "black",
        color: "orange",
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
          flexDirection: { xs: "column", md: "row" }, // column on mobile, row on md+
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
            About FoodHubb
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
            <Link href="/recipes" color="inherit" underline="hover">
              Browse Recipes
            </Link>
            <Link href="/categories" color="inherit" underline="hover">
              Categories
            </Link>
            <Link href="/favorites" color="inherit" underline="hover">
              My Favorites
            </Link>
            <Link href="/profile" color="inherit" underline="hover">
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
              contact@foodhubb.com
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
          <Box>
            <IconButton color="inherit" href="#" aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="Twitter">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="Instagram">
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
          <Link href="/privacy" color="inherit" underline="hover" variant="body2">
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" underline="hover" variant="body2">
            Terms of Service
          </Link>
          <Link href="/cookies" color="inherit" underline="hover" variant="body2">
            Cookie Policy
          </Link>
          <Link href="/support" color="inherit" underline="hover" variant="body2">
            Support
          </Link>
        </Box>

        {/* Copyright */}
        <Typography variant="body2">
          © {new Date().getFullYear()} FoodHubb App by Sayan Mondal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
