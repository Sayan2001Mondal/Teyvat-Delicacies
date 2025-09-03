import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "#0f172a", // Dark teal
        color: "#e2e8f0", // Light gray text
        textAlign: "center",
        py: 4,
        mt: 4,
        borderTop: "2px solid #134e4a", // Subtle teal border
        fontFamily: `'Cinzel', serif`,
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          gap: 4,
        }}
      >
        {/* About Section */}
        <Box sx={{ flex: 1, textAlign: "center", width: { xs: "100%", md: "auto" } }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#fb7185", fontWeight: "bold" }}>
            About FoodZone
          </Typography>
          <Typography variant="body2">
            Discover amazing recipes, connect with food lovers, and share your culinary adventures with our community.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box sx={{ flex: 1, textAlign: "center", width: { xs: "100%", md: "auto" } }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#fb7185", fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
            <Link href="/menu" underline="hover" sx={{ color: "#e2e8f0", "&:hover": { color: "#14b8a6" } }}>
              Browse Recipes
            </Link>
            <Link href="#" underline="hover" sx={{ color: "#e2e8f0", "&:hover": { color: "#14b8a6" } }}>
              Categories
            </Link>
            <Link href="#" underline="hover" sx={{ color: "#e2e8f0", "&:hover": { color: "#14b8a6" } }}>
              My Favorites
            </Link>
            <Link href="#" underline="hover" sx={{ color: "#e2e8f0", "&:hover": { color: "#14b8a6" } }}>
              Profile
            </Link>
          </Box>
        </Box>

        {/* Contact & Social */}
        <Box sx={{ flex: 1, textAlign: "center", width: { xs: "100%", md: "auto" } }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#fb7185", fontWeight: "bold" }}>
            Connect With Us
          </Typography>

          {/* Contact Info */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                mb: 1 
              }}
            >
              <Email sx={{ mr: 1, fontSize: 16 }} />
              contact@FoodZone.com
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                mb: 1 
              }}
            >
              <Phone sx={{ mr: 1, fontSize: 16 }} />
              +1 (555) 123-4567
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
              }}
            >
              <LocationOn sx={{ mr: 1, fontSize: 16 }} />
              New York, NY
            </Typography>
          </Box>

          {/* Social Media Icons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              href="https://www.facebook.com/"
              aria-label="Facebook"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { color: "#1877f2", transform: "scale(1.1)" },
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
                "&:hover": { color: "#1da1f2", transform: "scale(1.1)" },
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
                "&:hover": { color: "#e4405f", transform: "scale(1.1)" },
              }}
            >
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Legal Links */}
      <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #334155" }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Link href="#" underline="hover" variant="body2" sx={{ color: "#e2e8f0", "&:hover": { color: "#14b8a6" } }}>
            Privacy Policy
          </Link>
          <Link href="#" underline="hover" variant="body2" sx={{ color: "#e2e8f0", "&:hover": { color: "#14b8a6" } }}>
            Terms of Service
          </Link>
          <Link href="#" underline="hover" variant="body2" sx={{ color: "#e2e8f0", "&:hover": { color: "#14b8a6" } }}>
            Cookie Policy
          </Link>
          <Link href="#" underline="hover" variant="body2" sx={{ color: "#e2e8f0", "&:hover": { color: "#14b8a6" } }}>
            Support
          </Link>
        </Box>

        {/* Copyright */}
        <Typography variant="body2" sx={{ color: "#94a3b8" }}>
          © {new Date().getFullYear()} FoodZone App by Sayan Mondal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;