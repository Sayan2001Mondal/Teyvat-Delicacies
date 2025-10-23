"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupIcon from "@mui/icons-material/Group";

const team = [
  { name: "John Doe", role: "Founder & CEO", img: "https://i.pravatar.cc/150?img=3" },
  { name: "Emily Smith", role: "Head Chef", img: "https://i.pravatar.cc/150?img=5" },
  { name: "David Lee", role: "Operations Manager", img: "https://i.pravatar.cc/150?img=8" },
];

export default function AboutUsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background Image with Blur */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("/images/steak-frites.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          transform: "scale(1.1)",
          zIndex: -1,
        }}
      />

      <Box sx={{ color: "white", position: "relative" }}>
        {/* Hero Banner */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #0f766e, #14b8a6)",
            py: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 3 },
            textAlign: "center",
          }}
        >
          <Container maxWidth="lg">
            <RestaurantIcon
              sx={{
                fontSize: { xs: 35, sm: 45, md: 50 },
                mb: 2,
                color: "#fb7185",
              }}
            />
            <Typography
              variant={isSmall ? "h4" : isMobile ? "h3" : "h2"}
              fontWeight={800}
              color="black"
              gutterBottom
            >
              About FoodZone
            </Typography>
            <Typography
              variant={isSmall ? "body1" : isMobile ? "h6" : "h5"}
              color="black"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              Delicious meals delivered fresh to your doorstep, crafted with passion, love and care.
            </Typography>
          </Container>
        </Box>

        {/* Mission & Vision */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Stack spacing={{ xs: 3, md: 4 }} alignItems="center">
            <Card
              sx={{
                width: "100%",
                maxWidth: 800,
                bgcolor: "rgba(28, 28, 28, 0.95)",
                color: "white",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(15, 118, 110, 0.5)",
                borderRadius: 3,
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(20, 184, 166, 0.3)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <RestaurantIcon sx={{ color: "#14b8a6", fontSize: { xs: 24, md: 28 } }} />
                  <Typography variant={isMobile ? "h5" : "h4"} color="#14b8a6" fontWeight={700}>
                    Our Mission
                  </Typography>
                </Stack>
                <Typography
                  variant={isSmall ? "body2" : "body1"}
                  sx={{ lineHeight: 1.6, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  To bring you healthy, tasty, and affordable food anytime, anywhere —
                  combining authentic flavors with modern convenience to create memorable dining experiences.
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                width: "100%",
                maxWidth: 800,
                bgcolor: "rgba(28, 28, 28, 0.95)",
                color: "white",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(15, 118, 110, 0.5)",
                borderRadius: 3,
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(20, 184, 166, 0.3)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <VisibilityIcon sx={{ color: "#14b8a6", fontSize: { xs: 24, md: 28 } }} />
                  <Typography variant={isMobile ? "h5" : "h4"} color="#14b8a6" fontWeight={700}>
                    Our Vision
                  </Typography>
                </Stack>
                <Typography
                  variant={isSmall ? "body2" : "body1"}
                  sx={{ lineHeight: 1.6, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  To be the #1 choice for food lovers by connecting communities
                  through great taste, reliable service, and unforgettable culinary experiences.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Container>

        {/* Who We Are */}
        <Container maxWidth="lg">
          <Card
            sx={{
              bgcolor: "rgba(28, 28, 28, 0.95)",
              color: "white",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(15, 118, 110, 0.5)",
              borderRadius: 3,
              mb: { xs: 4, md: 6 },
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
              <Stack spacing={{ xs: 2.5, md: 3 }} textAlign={{ xs: "center", md: "left" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <GroupIcon sx={{ color: "#14b8a6", fontSize: { xs: 28, md: 32 } }} />
                  <Typography variant={isMobile ? "h4" : "h3"} color="#14b8a6" fontWeight={800}>
                    Who We Are
                  </Typography>
                </Stack>

                <Typography
                  variant={isSmall ? "body2" : "body1"}
                  sx={{
                    lineHeight: 1.7,
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    maxWidth: { md: "80%" },
                  }}
                >
                  At FoodZone, we believe food is more than just fuel — it's an experience that brings people together.
                  Our passionate team of chefs partners with top restaurants and local suppliers to prepare meals that
                  perfectly balance taste, health, and happiness. Every dish tells a story, and we're here to make sure
                  that story reaches your table fresh and delicious.
                </Typography>

                <Box sx={{ pt: 1 }}>
                  <Button
                    component={Link as any}
                    href="/menu"
                    variant="contained"
                    sx={{
                      bgcolor: "#fb7185",
                      color: "white",
                      fontWeight: 700,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.5 },
                      borderRadius: "30px",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#e11d48",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(251, 113, 133, 0.4)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    Explore Our Menu
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>

        {/* Meet Our Team */}
        <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 6 } }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            color="#fb7185"
            fontWeight={800}
            textAlign="center"
            sx={{ mb: { xs: 3, md: 4 } }}
          >
            Meet Our Team
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2.5, sm: 2, md: 3 }}
            flexWrap="wrap"
            justifyContent="center"
            alignItems={{ xs: "center", sm: "stretch" }}
            sx={{
              "& > *": {
                flex: { sm: "1 1 calc(50% - 8px)", md: "1 1 calc(33.333% - 16px)" },
                maxWidth: { xs: 300, sm: "none" },
              },
            }}
          >
            {team.map((member, index) => (
              <Card
                key={index}
                sx={{
                  bgcolor: "rgba(28, 28, 28, 0.95)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                  textAlign: "center",
                  border: "2px solid #14b8a6",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 12px 32px rgba(20, 184, 166, 0.3)",
                    borderColor: "#14b8a6",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Avatar
                    src={member.img}
                    sx={{
                      width: { xs: 70, sm: 80 },
                      height: { xs: 70, sm: 80 },
                      margin: "0 auto",
                      mb: 2,
                      border: "3px solid #14b8a6",
                    }}
                  />
                  <Typography
                    variant={isSmall ? "h6" : "h5"}
                    color="#14b8a6"
                    fontWeight={600}
                    gutterBottom
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      opacity: 0.9,
                    }}
                  >
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>

        {/* Call to Action */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #0f766e, #14b8a6)",
            textAlign: "center",
            py: { xs: 4, sm: 5, md: 6 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight={800}
              color="black"
              gutterBottom
              sx={{ mb: { xs: 2, md: 3 } }}
            >
              Ready to Taste the Difference?
            </Typography>
            <Typography
              variant={isSmall ? "body2" : "body1"}
              color="black"
              sx={{ mb: { xs: 2.5, md: 3 }, opacity: 0.8, maxWidth: "500px", mx: "auto" }}
            >
              Join thousands of satisfied customers who trust FoodZone for their daily meals
            </Typography>
            <Button
              component={Link as any}
              href="/menu"
              variant="contained"
              sx={{
                bgcolor: "#fb7185",
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                px: { xs: 3, sm: 4 },
                py: { xs: 1.25, sm: 1.5 },
                borderRadius: "30px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#e11d48",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(251, 113, 133, 0.4)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Order Now
            </Button>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
