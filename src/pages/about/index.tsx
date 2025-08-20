"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  LocalShipping as DeliveryIcon,
  Star as StarIcon,
  People as PeopleIcon,
  Timer as TimerIcon,
  Eco as EcoIcon,
} from "@mui/icons-material";

const stats = [
  { number: "50K+", label: "Happy Customers", icon: PeopleIcon },
  { number: "500+", label: "Menu Items", icon: RestaurantIcon },
  { number: "4.8", label: "Average Rating", icon: StarIcon },
  { number: "30min", label: "Avg Delivery", icon: TimerIcon },
];

const values = [
  {
    icon: RestaurantIcon,
    title: "Quality Food",
    description: "We source the finest ingredients and prepare every dish with love and attention to detail."
  },
  {
    icon: DeliveryIcon,
    title: "Fast Delivery",
    description: "Quick and reliable delivery service to bring fresh, hot meals right to your doorstep."
  },
  {
    icon: StarIcon,
    title: "Customer First",
    description: "Your satisfaction is our priority. We strive to exceed expectations with every order."
  },
  {
    icon: EcoIcon,
    title: "Sustainable",
    description: "Committed to eco-friendly practices and supporting local suppliers and communities."
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Head Chef",
    avatar: "/images/chef1.jpg",
    description: "15+ years of culinary excellence"
  },
  {
    name: "Mike Rodriguez",
    role: "Operations Manager",
    avatar: "/images/manager1.jpg", 
    description: "Ensuring smooth operations daily"
  },
  {
    name: "Emily Chen",
    role: "Customer Experience",
    avatar: "/images/support1.jpg",
    description: "Dedicated to your satisfaction"
  },
];

export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: "60vh", md: "70vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: { xs: 2, sm: 3, md: 6 },
          background: "linear-gradient(135deg, #ff3d00 0%, #ff6333 50%, #ff8f65 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            fontWeight={800}
            color="black"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              mb: 3,
            }}
          >
            About FoodZone 👨‍🍳
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              color: "black",
              fontWeight: 500,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.4rem" },
              lineHeight: 1.6,
            }}
          >
            Bringing you the finest culinary experiences since 2020. From farm to table, 
            we're passionate about serving delicious, fresh meals that bring people together.
          </Typography>
        </Container>
        
        {/* Decorative Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: { xs: 80, md: 120 },
            height: { xs: 80, md: 120 },
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.1)",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            left: "5%",
            width: { xs: 60, md: 100 },
            height: { xs: 60, md: 100 },
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.05)",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 4, sm: 6 }, background: "#fafafa" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Grid item xs={6} md={3} key={index}>
                  <Card
                    sx={{
                      textAlign: "center",
                      p: { xs: 2, sm: 3 },
                      height: "100%",
                      background: "white",
                      border: "2px solid transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: "2px solid #ff3d00",
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(255, 61, 0, 0.15)",
                      }
                    }}
                  >
                    <IconComponent 
                      sx={{ 
                        fontSize: { xs: 32, sm: 40 }, 
                        color: "#ff3d00", 
                        mb: 1 
                      }} 
                    />
                    <Typography 
                      variant="h3" 
                      fontWeight={800} 
                      color="#ff3d00"
                      sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="black" 
                      fontWeight={600}
                      sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                    >
                      {stat.label}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Box sx={{ py: { xs: 5, sm: 8 }, background: "white" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                fontWeight={700}
                color="black"
                gutterBottom
                sx={{ fontSize: { xs: "1.8rem", sm: "2.5rem" } }}
              >
                Our Story 📖
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                Founded in 2020 with a simple mission: to bring restaurant-quality meals 
                to your home. What started as a small family business has grown into a 
                beloved food destination serving thousands of happy customers.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  lineHeight: 1.8
                }}
              >
                We believe food is more than just nourishment—it's about connection, 
                tradition, and creating moments that matter. Every dish tells a story, 
                and we're honored to be part of yours.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: "linear-gradient(135deg, #ff3d00, #ff6333)",
                  borderRadius: 3,
                  p: 4,
                  textAlign: "center",
                  color: "white",
                }}
              >
                <RestaurantIcon sx={{ fontSize: 80, mb: 2, color: "black" }} />
                <Typography variant="h5" fontWeight={700} color="black" gutterBottom>
                  Farm to Table
                </Typography>
                <Typography variant="body1" color="black" sx={{ opacity: 0.9 }}>
                  We partner with local farms and suppliers to ensure the freshest 
                  ingredients in every meal we prepare.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Values Section */}
      <Box sx={{ py: { xs: 5, sm: 8 }, background: "#fafafa" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={700}
            color="black"
            textAlign="center"
            gutterBottom
            sx={{ 
              fontSize: { xs: "1.8rem", sm: "2.5rem" },
              mb: 5
            }}
          >
            Our Values ⭐
          </Typography>
          
          <Grid container spacing={3}>
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      p: 3,
                      textAlign: "center",
                      background: "white",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #ff3d00, #ff6333)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 35, color: "black" }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} color="black" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: { xs: 5, sm: 8 }, background: "white" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={700}
            color="black"
            textAlign="center"
            gutterBottom
            sx={{ 
              fontSize: { xs: "1.8rem", sm: "2.5rem" },
              mb: 5
            }}
          >
            Meet Our Team 👥
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 4,
                    height: "100%",
                    background: "white",
                    border: "1px solid #f0f0f0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "1px solid #ff3d00",
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 25px rgba(255, 61, 0, 0.1)",
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 80, sm: 100 },
                      height: { xs: 80, sm: 100 },
                      mx: "auto",
                      mb: 3,
                      background: "linear-gradient(135deg, #ff3d00, #ff6333)",
                      color: "black",
                      fontSize: { xs: "1.5rem", sm: "2rem" },
                      fontWeight: 700,
                    }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h6" fontWeight={700} color="black" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    color="#ff3d00" 
                    fontWeight={600} 
                    gutterBottom
                  >
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: { xs: 5, sm: 8 },
          background: "linear-gradient(135deg, #ff3d00, #ff6333)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            fontWeight={700}
            color="black"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            Ready to Experience FoodZone? 🚀
          </Typography>
          <Typography
            variant="h6"
            color="black"
            sx={{ 
              opacity: 0.9,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              mb: 4
            }}
          >
            Join thousands of satisfied customers and discover your new favorite meal today!
          </Typography>
        </Container>
      </Box>
    </>
  );
}