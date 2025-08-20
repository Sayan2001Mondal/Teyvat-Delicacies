"use client";

import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

const team = [
  { name: "John Doe", role: "Founder & CEO", img: "https://i.pravatar.cc/150?img=3" },
  { name: "Emily Smith", role: "Head Chef", img: "https://i.pravatar.cc/150?img=5" },
  { name: "David Lee", role: "Operations Manager", img: "https://i.pravatar.cc/150?img=8" },
];

export default function AboutUsPage() {
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
          filter: "blur(20px)", // 🔥 blur effect
          transform: "scale(1.1)", // prevent blur edges
          zIndex: -1,
        }}
      />

      {/* Main Content */}
      <Box sx={{ color: "white" }}>
        {/* Hero Banner */}
        <Box
          sx={{
            bgcolor: "rgba(255,61,0,0.9)", // translucent orange overlay
            p: { xs: 6, md: 10 },
            textAlign: "center",
          }}
        >
          <Typography variant="h3" fontWeight="bold" color="black">
            About FoodZone
          </Typography>
          <Typography variant="h6" mt={2} color="black">
            Delicious meals delivered fresh to your doorstep, crafted with passion and care.
          </Typography>
        </Box>

        {/* Mission & Vision */}
        <Stack direction="column" spacing={4} alignItems="center" sx={{ py: 6, px: 2 }}>
          <Card sx={{ maxWidth: 800, bgcolor: "#1c1c1c", color: "white" }}>
            <CardContent>
              <Typography variant="h5" color="#ff3d00" gutterBottom>
                Our Mission
              </Typography>
              <Typography>
                To bring you healthy, tasty, and affordable food anytime, anywhere —
                combining authentic flavors with modern convenience.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 800, bgcolor: "#1c1c1c", color: "white" }}>
            <CardContent>
              <Typography variant="h5" color="#ff3d00" gutterBottom>
                Our Vision
              </Typography>
              <Typography>
                To be the #1 choice for food lovers by connecting communities
                through great taste and reliable service.
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Who We Are */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            p: { xs: 4, md: 8 },
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4" color="#ff3d00" fontWeight="bold">
              Who We Are
            </Typography>
            <Typography>
              At FoodZone, we believe food is more than just fuel — it’s an experience. 
              Our chefs partner with top restaurants to prepare meals that balance taste, 
              health, and happiness.
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#ff3d00",
                color: "black",
                fontWeight: "bold",
                width: "fit-content",
              }}
            >
              Explore Menu
            </Button>
          </Stack>
        </Box>

        {/* Meet Our Team */}
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h4" color="#ff3d00" fontWeight="bold" mb={4}>
            Meet Our Team
          </Typography>

          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={4}>
            {team.map((member, index) => (
              <Card
                key={index}
                sx={{
                  bgcolor: "#1c1c1c",
                  color: "white",
                  width: 250,
                  textAlign: "center",
                  border: "2px solid #ff3d00",
                  borderRadius: 3,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardContent>
                  <Avatar
                    src={member.img}
                    sx={{ width: 80, height: 80, margin: "0 auto", mb: 2 }}
                  />
                  <Typography variant="h6" color="#ff3d00">
                    {member.name}
                  </Typography>
                  <Typography variant="body2">{member.role}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            bgcolor: "#ff3d00",
            textAlign: "center",
            py: 6,
            mt: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="black" mb={2}>
            Ready to Taste the Difference?
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "#ff3d00",
              fontWeight: "bold",
              ":hover": {
                background: "#ff6333",
                color: "black",
                border: "1px solid black",
              },
            }}
          >
            Order Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
