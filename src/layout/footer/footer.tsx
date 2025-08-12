import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(to right, #1b2735, #090a0f)", 
        color: "#FFD700", 
        textAlign: "center",
        py: 2,
        mt: 4,
        borderTop: "2px solid #FFD700",
        fontFamily: `'Cinzel', serif`, 
        position: "relative",
      }}
    >
      
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          height: "4px",
          backgroundColor: "#FFD700",
          borderRadius: "2px",
        }}
      />

      <Typography variant="body2">
        © {new Date().getFullYear()} Genshin Food App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
