"use client";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import RestaurantIcon from "@mui/icons-material/Restaurant";

// Dynamically import the map to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Restaurant location (Bankra, West Bengal)
  const restaurantLocation = {
    lat: 22.6203,
    lng: 88.3199,
    address: "123 Food Street, Culinary District, Bankra, West Bengal 711403"
  };

  useEffect(() => {
    // Load Leaflet CSS
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
      
      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  const handleInputChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: LocationOnIcon,
      title: "Visit Us",
      details: ["123 Food Street", "Culinary District", "Bankra, West Bengal 711403"],
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: EmailIcon,
      title: "Email Us",
      details: ["info@foodzone.com", "support@foodzone.com"],
    },
    {
      icon: AccessTimeIcon,
      title: "Business Hours",
      details: ["Mon - Sun: 10:00 AM - 11:00 PM", "Kitchen closes at 10:30 PM"],
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "#fafafa" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #0f766e 0%, #14b8a6 100%)",
          py: { xs: 4, sm: 6, md: 8 },
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <RestaurantIcon sx={{ fontSize: { xs: 35, sm: 45, md: 50 }, mb: 2 }} />
          <Typography
            variant={isSmall ? "h5" : isMobile ? "h4" : "h2"}
            fontWeight={800}
            gutterBottom
            sx={{ px: { xs: 2, sm: 0 } }}
          >
            Contact FoodZone
          </Typography>
          <Typography
            variant={isSmall ? "body2" : isMobile ? "body1" : "h6"}
            sx={{ 
              maxWidth: "600px", 
              mx: "auto", 
              opacity: 0.9, 
              fontWeight: 500,
              px: { xs: 2, sm: 0 }
            }}
          >
            Have a question, feedback, or craving something special? 
            We'd love to hear from you!
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
        {/* Contact Information */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={700}
            color="black"
            gutterBottom
            sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}
          >
            Get in Touch
          </Typography>
          
          <Stack 
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            sx={{ 
              flexWrap: { sm: "wrap" },
              "& > *": {
                flex: { sm: "1 1 calc(50% - 8px)", md: "1 1 calc(25% - 12px)" }
              }
            }}
          >
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Paper
                  key={index}
                  sx={{
                    p: { xs: 2.5, sm: 3 },
                    background: "white",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease",
                    minHeight: { xs: "auto", sm: 140 },
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 16px rgba(255, 61, 0, 0.1)",
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        background: "#0f766e",
                        color: "white",
                        p: { xs: 1, sm: 1.5 },
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent sx={{ fontSize: { xs: 18, sm: 20 } }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant={isSmall ? "subtitle1" : "h6"}
                        fontWeight={600}
                        color="black"
                        gutterBottom
                      >
                        {item.title}
                      </Typography>
                      <Stack spacing={0.5}>
                        {item.details.map((detail, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            color="text.secondary"
                            sx={{ 
                              lineHeight: 1.4,
                              fontSize: { xs: "0.8rem", sm: "0.875rem" }
                            }}
                          >
                            {detail}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Box>

        {/* Contact Form */}
        <Paper
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
            background: "white",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: 3,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={700}
            color="black"
            gutterBottom
            sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}
          >
            Send Us a Message
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Name and Email Row */}
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  required
                  size={isSmall ? "small" : "medium"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#", fontSize: { xs: 20, sm: 24 } }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0f766e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0f766e",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0f766e",
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  required
                  size={isSmall ? "small" : "medium"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#0f766e", fontSize: { xs: 20, sm: 24 } }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0f766e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0f766e",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0f766e",
                    },
                  }}
                />
              </Stack>

              {/* Phone and Subject Row */}
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  size={isSmall ? "small" : "medium"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "#0f766e", fontSize: { xs: 20, sm: 24 } }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0f766e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0f766e",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0f766e",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Subject"
                  value={formData.subject}
                  onChange={handleInputChange("subject")}
                  required
                  size={isSmall ? "small" : "medium"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#0f766e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0f766e",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#0f766e",
                    },
                  }}
                />
              </Stack>

              {/* Message Field */}
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={isSmall ? 4 : 6}
                value={formData.message}
                onChange={handleInputChange("message")}
                required
                size={isSmall ? "small" : "medium"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: { xs: 1.5, sm: 2 } }}>
                      <MessageIcon sx={{ color: "#0f766e", fontSize: { xs: 20, sm: 24 } }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#0f766e",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0f766e",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0f766e",
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                endIcon={<SendIcon />}
                sx={{
                  background: "#0f766e",
                  color: "white",
                  py: { xs: 1.25, sm: 1.5 },
                  borderRadius: "30px",
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textTransform: "none",
                  "&:hover": {
                    background: "##0f766e",
                  },
                  "&:disabled": {
                    background: "rgba(255, 61, 0, 0.5)",
                  },
                }}
              >
                {loading ? "Sending Message..." : "Send Message"}
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* Interactive Map */}
        <Paper
          sx={{
            p: { xs: 2.5, sm: 3 },
            background: "white",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            fontWeight={600} 
            color="black" 
            gutterBottom
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            Find Us Here
          </Typography>
          
          <Box
            sx={{
              height: { xs: 250, sm: 300, md: 350 },
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {mapLoaded && typeof window !== 'undefined' ? (
              <MapContainer
                center={[restaurantLocation.lat, restaurantLocation.lng]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[restaurantLocation.lat, restaurantLocation.lng]}>
                  <Popup>
                    <Box sx={{ textAlign: "center", p: 1 }}>
                      <RestaurantIcon sx={{ color: "#0f766e", fontSize: 24, mb: 1 }} />
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        FoodZone Restaurant
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {restaurantLocation.address}
                      </Typography>
                      <Button
                        size="small"
                        sx={{ 
                          mt: 1,
                          color: "#0f766e",
                          textTransform: "none",
                          fontWeight: 600
                        }}
                        onClick={() => {
                          const url = `https://maps.google.com/?q=${restaurantLocation.lat},${restaurantLocation.lng}`;
                          window.open(url, '_blank');
                        }}
                      >
                        Get Directions
                      </Button>
                    </Box>
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  background: "linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(-45deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f5f5 75%), linear-gradient(-45deg, transparent 75%, #f5f5f5 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textAlign: "center",
                  flexDirection: "column",
                  gap: 2
                }}
              >
                <LocationOnIcon sx={{ fontSize: 40, color: "#0f766e" }} />
                <Typography>Loading Interactive Map...</Typography>
              </Box>
            )}
          </Box>
          
          {/* Map Info */}
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              📍 Located in the heart of Bankra, West Bengal
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Click the marker for directions • Scroll to zoom • Drag to explore
            </Typography>
          </Box>
        </Paper>

        {/* Why Choose FoodZone Section */}
        <Paper
          sx={{
            background: "white",
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 3,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={700}
            color="black"
            align="center"
            gutterBottom
            sx={{ mb: { xs: 3, md: 4 } }}
          >
            Why Choose FoodZone?
          </Typography>
          
          <Stack spacing={{ xs: 3, sm: 4 }}>
            {[
              {
                icon: RestaurantIcon,
                title: "Fresh Ingredients",
                description: "We source only the finest, freshest ingredients to ensure every dish is of the highest quality."
              },
              {
                icon: AccessTimeIcon,
                title: "Fast Delivery",
                description: "Hot, delicious meals delivered to your doorstep within 30 minutes or less."
              },
              {
                icon: PersonIcon,
                title: "Customer First",
                description: "Your satisfaction is our priority. We're always here to help and make things right."
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Box key={index}>
                  <Stack 
                    direction={{ xs: "column", sm: "row" }} 
                    spacing={{ xs: 2, sm: 3 }}
                    alignItems={{ xs: "center", sm: "flex-start" }}
                    textAlign={{ xs: "center", sm: "left" }}
                  >
                    <Box
                      sx={{
                        background: "linear-gradient(180deg, #0f766e 0%, #14b8a6 100%)",
                        width: { xs: 50, sm: 60 },
                        height: { xs: 50, sm: 60 },
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent sx={{ color: "white", fontSize: { xs: 24, sm: 28 } }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant={isSmall ? "subtitle1" : "h6"} 
                        fontWeight={600} 
                        color="black" 
                        gutterBottom
                      >
                        {item.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Stack>
                  {index < 2 && (
                    <Divider 
                      sx={{ 
                        mt: { xs: 3, sm: 4 },
                        borderColor: "rgba(0, 0, 0, 0.1)" 
                      }} 
                    />
                  )}
                </Box>
              );
            })}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}