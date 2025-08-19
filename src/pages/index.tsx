// src/pages/index.tsx
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia, Chip } from "@mui/material";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const popularDishes = [
    {
      title: "BBQ Chicken Burger",
      description: "Juicy grilled chicken with our signature BBQ sauce, fresh lettuce, tomatoes, and crispy onions on a toasted brioche bun.",
      price: "$15.00",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Burgers"
    },
    {
      title: "Margherita Pizza",
      description: "Classic Italian pizza with San Marzano tomatoes, fresh mozzarella, basil leaves, and extra virgin olive oil.",
      price: "$18.00",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Pizza"
    },
    {
      title: "Chicken Biryani",
      description: "Aromatic basmati rice cooked with tender chicken, traditional spices, and garnished with fried onions and fresh herbs.",
      price: "$16.00",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Asian"
    },
    {
      title: "Pancakes Stack",
      description: "Fluffy buttermilk pancakes served with maple syrup, fresh seasonal berries, and whipped cream.",
      price: "$12.00",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Desserts"
    },
    {
      title: "Spaghetti Carbonara",
      description: "Traditional Italian pasta with crispy pancetta, parmesan cheese, and creamy egg sauce.",
      price: "$14.00",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Pasta"
    },
    {
      title: "Caesar Salad",
      description: "Fresh romaine lettuce, parmesan cheese, croutons, and our signature Caesar dressing.",
      price: "$10.00",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Salads"
    }
  ];

  const categories = [
    {
      title: "Burgers",
      description: "Juicy, flame-grilled perfection",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      emoji: "🍔"
    },
    {
      title: "Pizza",
      description: "Authentic Italian flavors",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      emoji: "🍕"
    },
    {
      title: "Asian Cuisine",
      description: "Traditional and modern Asian dishes",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      emoji: "🥢"
    },
    {
      title: "Desserts",
      description: "Sweet endings to perfect meals",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      emoji: "🍰"
    }
  ];

  const features = [
    {
      icon: "🚀",
      title: "Fast Delivery",
      description: "Get your favorite meals delivered in under 30 minutes with our lightning-fast delivery service."
    },
    {
      icon: "🍃",
      title: "Fresh Ingredients",
      description: "We use only the freshest, locally-sourced ingredients to ensure every bite is delicious and nutritious."
    },
    {
      icon: "💰",
      title: "Affordable Prices",
      description: "Enjoy restaurant-quality meals at prices that won't break the bank. Quality food for everyone!"
    }
  ];

  const testimonials = [
    {
      text: "The best food delivery service in the city! Always fresh, always on time, and the flavors are incredible.",
      author: "Sarah Johnson",
      rating: 5
    },
    {
      text: "I order from FoodieHub at least twice a week. Their BBQ burger is absolutely amazing!",
      author: "Mike Chen",
      rating: 5
    },
    {
      text: "Great quality food at reasonable prices. The delivery is super fast and the packaging is eco-friendly.",
      author: "Emily Davis",
      rating: 5
    }
  ];

  return (
    <>
      <Head>
        <title>FoodieHub - Enjoy Delicious Food</title>
        <meta name="description" content="Fast, Fresh & Affordable food delivery service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: "100vh", md: "100vh" },
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                      url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          px: { xs: 2, sm: 3 },
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Floating Animation Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: { xs: 60, md: 100 },
            height: { xs: 60, md: 100 },
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-20px)" }
            }
          }}
        />
        
        <Box sx={{ maxWidth: "800px", zIndex: 2 }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" }, 
              mb: 2,
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
              animation: "fadeInUp 1s ease-out"
            }}
          >
            Enjoy Our Delicious Food
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              animation: "fadeInUp 1s ease-out 0.3s both"
            }}
          >
            Fast, Fresh & Affordable - Delivered Right to Your Door
          </Typography>
          
          <Button 
            variant="contained" 
            size="large" 
            href="#menu"
            sx={{
              background: "linear-gradient(45deg, #ff6b35, #f7931e)",
              borderRadius: "50px",
              px: { xs: 4, sm: 6 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: 600,
              boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
              animation: "fadeInUp 1s ease-out 0.6s both, pulse 2s infinite",
              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.05)" }
              },
              "@keyframes fadeInUp": {
                from: {
                  opacity: 0,
                  transform: "translateY(50px)"
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)"
                }
              },
              "&:hover": {
                background: "linear-gradient(45deg, #ff8035, #f7a31e)",
                transform: "translateY(-3px)",
                boxShadow: "0 8px 25px rgba(255, 107, 53, 0.6)"
              }
            }}
          >
            Order Now
          </Button>
        </Box>
      </Box>

      {/* Countdown Section */}
      <Box
        sx={{
          background: "#1a1a1a",
          color: "white",
          py: { xs: 6, md: 8 },
          textAlign: "center"
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#ff6b35",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }
            }}
          >
            Special Offer Ends Soon!
          </Typography>
          
          <Typography
            variant="h6"
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              fontSize: { xs: "1rem", sm: "1.2rem" }
            }}
          >
            Get 30% off on your first order
          </Typography>
          
          <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <Grid item key={unit}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                      fontWeight: 700,
                      color: "#ff6b35",
                      display: "block"
                    }}
                  >
                    {value.toString().padStart(2, '0')}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                      textTransform: "uppercase",
                      letterSpacing: 1
                    }}
                  >
                    {unit}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#333",
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" }
            }}
          >
            About FoodieHub
          </Typography>
          
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#666",
              mb: 6,
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.2rem" }
            }}
          >
            We are passionate about bringing you the finest culinary experiences with fresh ingredients and exceptional service.
          </Typography>
          
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#333",
                    mb: 2,
                    fontWeight: 600,
                    fontSize: { xs: "1.8rem", sm: "2rem" }
                  }}
                >
                  Our Story
                </Typography>
                
                <Typography
                  sx={{
                    color: "#666",
                    mb: 2,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.8
                  }}
                >
                  FoodieHub started with a simple mission: to deliver restaurant-quality meals right to your doorstep. We believe that great food brings people together and creates memorable experiences.
                </Typography>
                
                <Typography
                  sx={{
                    color: "#666",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.8
                  }}
                >
                  Our team of expert chefs carefully crafts each dish using only the freshest, locally-sourced ingredients. From traditional favorites to innovative culinary creations, every meal is prepared with love and attention to detail.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: "url('https://images.unsplash.com/photo-1556909114-4f6e4af6e16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: { xs: 300, sm: 400, md: 450 },
                  borderRadius: 2,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: "white" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#333",
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" }
            }}
          >
            Why Choose FoodieHub?
          </Typography>
          
          <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    p: { xs: 3, sm: 4 },
                    textAlign: "center",
                    border: "none",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                    borderRadius: 3,
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
                    }
                  }}
                >
                  <Typography sx={{ fontSize: { xs: "2.5rem", sm: "3rem" }, mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: "#333",
                      fontSize: { xs: "1.3rem", sm: "1.5rem" }
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography
                    sx={{
                      color: "#666",
                      lineHeight: 1.6,
                      fontSize: { xs: "0.9rem", sm: "1rem" }
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Menu Categories */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#333",
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" }
            }}
          >
            Our Menu Categories
          </Typography>
          
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#666",
              mb: 6,
              fontSize: { xs: "1rem", sm: "1.2rem" }
            }}
          >
            Explore our diverse range of delicious cuisines
          </Typography>
          
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 200, sm: 250 },
                      background: `url('${category.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(transparent, rgba(0, 0, 0, 0.8))",
                        color: "white",
                        p: { xs: 2, sm: 3 }
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 0.5,
                          fontSize: { xs: "1.3rem", sm: "1.5rem" }
                        }}
                      >
                        {category.emoji} {category.title}
                      </Typography>
                      
                      <Typography
                        sx={{
                          opacity: 0.9,
                          fontSize: { xs: "0.9rem", sm: "1rem" }
                        }}
                      >
                        {category.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Popular Dishes */}
      <Box id="menu" sx={{ py: { xs: 8, md: 12 }, background: "white" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#333",
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" }
            }}
          >
            Popular Dishes
          </Typography>
          
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#666",
              mb: 6,
              fontSize: { xs: "1rem", sm: "1.2rem" }
            }}
          >
            Customer favorites that keep them coming back
          </Typography>
          
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {popularDishes.map((dish, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)"
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={dish.image}
                    alt={dish.title}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ mb: 1 }}>
                      <Chip
                        label={dish.category}
                        size="small"
                        sx={{
                          background: "#ff6b35",
                          color: "white",
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#333",
                        fontSize: { xs: "1.2rem", sm: "1.3rem" }
                      }}
                    >
                      {dish.title}
                    </Typography>
                    
                    <Typography
                      sx={{
                        color: "#666",
                        mb: 2,
                        lineHeight: 1.6,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        flexGrow: 1
                      }}
                    >
                      {dish.description}
                    </Typography>
                    
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          background: "#ff6b35",
                          borderRadius: "25px",
                          px: 3,
                          fontWeight: 600,
                          fontSize: { xs: "0.8rem", sm: "0.9rem" },
                          "&:hover": {
                            background: "#e55a2b",
                            transform: "translateY(-2px)"
                          }
                        }}
                      >
                        Add to Cart
                      </Button>
                      
                      <Typography
                        sx={{
                          fontSize: { xs: "1.3rem", sm: "1.5rem" },
                          fontWeight: 700,
                          color: "#ff6b35"
                        }}
                      >
                        {dish.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: "#1a1a1a", color: "white" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" }
            }}
          >
            What Our Customers Say
          </Typography>
          
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#ccc",
              mb: 6,
              fontSize: { xs: "1rem", sm: "1.2rem" }
            }}
          >
            Real reviews from real customers
          </Typography>
          
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    p: { xs: 3, sm: 4 },
                    borderRadius: 4,
                    textAlign: "center",
                    height: "100%",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <Typography
                    sx={{
                      color: "#ffd700",
                      fontSize: "1.2rem",
                      mb: 2
                    }}
                  >
                    {"⭐".repeat(testimonial.rating)}
                  </Typography>
                  
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      fontStyle: "italic",
                      mb: 3,
                      lineHeight: 1.8
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#ff6b35"
                    }}
                  >
                    {testimonial.author}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(45deg, #ff6b35, #f7931e)",
          color: "white",
          textAlign: "center"
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" }
            }}
          >
            Ready to Order?
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: "1rem", sm: "1.2rem" }
            }}
          >
            Don't wait! Your delicious meal is just a click away.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "white",
              color: "#ff6b35",
              px: { xs: 4, sm: 6 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              fontWeight: 700,
              borderRadius: "50px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                background: "#f5f5f5",
                transform: "translateY(-3px)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)"
              }
            }}
          >
            Order Now
          </Button>
        </Container>
      </Box>
    </>
  );
}