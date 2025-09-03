"use client";

import { useEffect, useState } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  useTheme, 
  useMediaQuery,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip
} from "@mui/material";
import Link from "next/link";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import SteakImg from "../../public/images/steak-frites.jpg";
import "@splidejs/splide/dist/css/splide.min.css";

const foodImages = [
  "/images/beef-tacos.jpg",
  "/images/caesar-salad.jpg",
  "/images/chicken-curry.jpg",
  "/images/chocolate-brownie.jpg",
  "/images/mushroom-risotto.jpg",
];

// New data for enhanced sections
const features = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    description: "Get your favorite meals delivered in 30 minutes or less"
  },
  {
    icon: "👨‍🍳",
    title: "Expert Chefs",
    description: "Prepared by professional chefs with years of experience"
  },
  {
    icon: "🌱",
    title: "Fresh Ingredients",
    description: "We source only the freshest, locally-sourced ingredients"
  },
  {
    icon: "💎",
    title: "Premium Quality",
    description: "Restaurant-quality meals at affordable prices"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "S",
    rating: 5,
    comment: "Absolutely amazing! The food arrived hot and fresh. Best delivery service in town!",
    location: "New York, NY"
  },
  {
    name: "Mike Chen",
    avatar: "M",
    rating: 5,
    comment: "The variety is incredible and everything tastes restaurant-quality. Highly recommend!",
    location: "Los Angeles, CA"
  },
  {
    name: "Emily Davis",
    avatar: "E",
    rating: 4,
    comment: "Great flavors and quick delivery. The chicken curry is my absolute favorite!",
    location: "Chicago, IL"
  }
];

const stats = [
  { number: 10000, suffix: "K+", label: "Happy Customers" },
  { number: 500, suffix: "+", label: "Dishes Available" },
  { number: 15, suffix: "min", label: "Average Prep Time" },
  { number: 4.9, suffix: "★", label: "Customer Rating" }
];

export default function HomePage() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  // State for animated counters
  const [counters, setCounters] = useState([0, 0, 0, 0]);

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

  // Counter animation effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters([
        Math.floor(stats[0].number * progress), // 10000
        Math.floor(stats[1].number * progress), // 500
        Math.floor(stats[2].number * progress), // 15
        parseFloat((stats[3].number * progress).toFixed(1)), // 4.9
      ]);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Set final values to ensure accuracy
        setCounters([stats[0].number, stats[1].number, stats[2].number, stats[3].number]);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

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
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)", // dark overlay for readability
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant={isXs ? "h4" : isSm ? "h3" : isMd ? "h2" : "h1"}
            fontWeight={800}
            gutterBottom
            sx={{
              color: "white",
              textShadow: "2px 3px 6px rgba(251, 113, 133, 0.7)", // coral glow
            }}
          >
            Welcome to FoodZone 🍴
          </Typography>

          <Typography
            variant={isXs ? "body1" : "h6"}
            sx={{
              maxWidth: "700px",
              mx: "auto",
              opacity: 0.95,
              color: "rgba(255,255,255,0.9)",
              fontWeight: 500,
            }}
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
                background: "#fb7185", // coral
                color: "white",
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                textTransform: "none",
                ":hover": { background: "#f43f5e" }, // darker coral
              }}
            >
              Explore Menu
            </Button>
            <Button
              component={Link as any}
              href="/about"
              sx={{
                border: "2px solid #14b8a6", // teal border
                color: "white",
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                textTransform: "none",
                ":hover": {
                  background: "rgba(20, 184, 166, 0.15)", // subtle teal hover
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Food Showcase */}
      <Box sx={{ py: { xs: 4, sm: 6 }, background: "rgba(20,184,166,0.05)" }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
          color="#0f766e" // teal heading
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
        >
          Our Specialties
        </Typography>

        <Container maxWidth="">
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
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: "0 6px 18px rgba(15, 118, 110, 0.4)", // teal shadow
                        },
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 4, sm: 6 }, background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)" }}>
        <Container maxWidth="lg">
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={4} 
            justifyContent="space-around" 
            alignItems="center"
          >
            {stats.map((stat, index) => (
              <Box key={index} textAlign="center" sx={{ minWidth: "120px" }}>
                <Typography
                  variant="h2"
                  fontWeight={800}
                  sx={{
                    color: "white",
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {index === 0 ? Math.floor(counters[index] / 1000) + "K+" :
                   index === 1 ? counters[index] + "+" :
                   index === 2 ? counters[index] + "min" :
                   counters[index] + "★"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: 500,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, sm: 8 }, background: "#f8fafc" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            fontWeight={700}
            gutterBottom
            color="#0f766e"
            sx={{ 
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
              mb: { xs: 4, sm: 6 }
            }}
          >
            Why Choose FoodZone?
          </Typography>
          
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, sm: 4 },
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  flex: { xs: "1", md: "0 1 calc(50% - 16px)", lg: "0 1 calc(25% - 16px)" },
                  minWidth: { xs: "100%", sm: "280px" },
                  maxWidth: { xs: "100%", md: "300px" },
                  p: 2,
                  textAlign: "center",
                  border: "1px solid rgba(20, 184, 166, 0.1)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(20, 184, 166, 0.15)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h2"
                    sx={{ 
                      fontSize: { xs: "2.5rem", sm: "3rem" }, 
                      mb: 2,
                      lineHeight: 1
                    }}
                  >
                    {feature.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    color="#0f766e"
                    sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: "0.85rem", sm: "0.9rem" },
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 6, sm: 8 }, background: "rgba(20,184,166,0.03)" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            fontWeight={700}
            gutterBottom
            color="#0f766e"
            sx={{ 
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
              mb: { xs: 4, sm: 6 }
            }}
          >
            What Our Customers Say
          </Typography>
          
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, sm: 4 },
            justifyContent: "center"
          }}>
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                sx={{
                  flex: { xs: "1", md: "0 1 calc(33.33% - 16px)" },
                  maxWidth: { xs: "100%", md: "350px" },
                  p: 3,
                  boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: "#14b8a6",
                        color: "white",
                        width: 48,
                        height: 48,
                        fontSize: "1.2rem",
                        fontWeight: 600
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600} color="#0f766e">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.location}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                  
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: "italic",
                      lineHeight: 1.6,
                      color: "text.primary"
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Call-to-Action Section */}
      <Box
        sx={{
          py: { xs: 6, sm: 8 },
          background: "linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            fontWeight={700}
            color="white"
            gutterBottom
            sx={{ 
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            Ready to Order?
          </Typography>
          
          <Typography
            variant="h6"
            color="rgba(255,255,255,0.9)"
            sx={{ 
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              lineHeight: 1.6
            }}
          >
            Join thousands of satisfied customers and experience the best food delivery service in town!
          </Typography>
          
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component={Link as any}
              href="/menu"
              size="large"
              sx={{
                background: "white",
                color: "#fb7185",
                px: { xs: 4, sm: 5 },
                py: { xs: 1.5, sm: 2 },
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                textTransform: "none",
                minWidth: "180px",
                boxShadow: "0 4px 15px rgba(255,255,255,0.3)",
                "&:hover": {
                  background: "rgba(255,255,255,0.95)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(255,255,255,0.4)",
                },
              }}
            >
              Order Now 🚀
            </Button>
            
            <Chip
              label="🎉 Free delivery on orders over $25"
              sx={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                px: 1,
                py: 0.5,
              }}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
}