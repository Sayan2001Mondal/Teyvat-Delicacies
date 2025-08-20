"use client";

import { useEffect } from "react";
import { Box, Container, Typography, Button, Stack, useTheme, useMediaQuery } from "@mui/material";
import Link from "next/link";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import SteakImg from  "../../public/images/steak-frites.jpg"
import "@splidejs/splide/dist/css/splide.min.css";

const foodImages = [
  "/images/beef-tacos.jpg",
  "/images/caesar-salad.jpg",
  "/images/chicken-curry.jpg",
  "/images/chocolate-brownie.jpg",
  "/images/mushroom-risotto.jpg",
];

export default function HomePage() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  // initialize Splide after render
  useEffect(() => {
    const splide = new Splide(".splide", {
      type: "loop",
      drag: "free",
      focus: "center",
      perPage: isXs ? 1 : isSm ? 2 : isMd ? 3 : isLg ? 4 : 5,
      gap: "1rem",
      autoScroll: {
        speed: 1,
      },
    });

    splide.mount({ AutoScroll });

    return () => {
      splide.destroy();
    };
  }, [isXs, isSm, isMd, isLg, isXl]);

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: "75vh", md: "85vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: { xs: 2, sm: 3, md: 6 },
          backgroundImage: `url(${SteakImg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isXs ? "h4" : isSm ? "h3" : isMd ? "h2" : "h1"}
            fontWeight={800}
            color="#beb5ce"
            gutterBottom
            className = "bordered-text" 
          >
            Welcome to FoodZone 🍴
          </Typography>
          <Typography
            variant={isXs ? "body1" : "h6"}
            sx={{ maxWidth: "700px", mx: "auto", opacity: 0.9, color: "black", fontWeight: "600" }}
            gutterBottom
          >
            Delicious meals delivered fresh to your doorstep. Explore our menu and discover your next favorite dish!
          </Typography>

          {/* CTA Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center" mt={3} flexWrap="wrap">
            <Button
              component={Link as any}
              href="/menu"
              sx={{
                background: "white",
                color: "black",
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                textTransform: "none",
                ":hover": { background: "#ffe0b2" },
              }}
            >
              Explore Menu
            </Button>
            <Button
              component={Link as any}
              href="/about"
              sx={{
                border: "2px solid white",
                color: "white",
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                textTransform: "none",
                ":hover": { background: "rgba(255,255,255,0.1)" },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Food Showcase with Splide */}
      <Box sx={{ py: { xs: 4, sm: 6 }, background: "#fafafa" }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
          color="black"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
        >
          Our Specialties
        </Typography>

        <Container maxWidth  ="">
          <div className="splide">
            <div className="splide__track">
              <ul className="splide__list">
                {foodImages.map((img, idx) => (
                  <li className="splide__slide" key={idx}>
                    <Box
                      component="img"
                      src={img}
                      alt={`Food ${idx + 1}`}
                      sx={{
                        width: "100%",
                        height: { xs: 180, sm: 200, md: 250 },
                        objectFit: "cover",
                        borderRadius: 3,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Box>
    </>
  );
}
