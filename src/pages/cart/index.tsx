"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Card,
  CardContent,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
} from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "sonner";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PaymentIcon from "@mui/icons-material/Payment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

interface CartState {
  [id: string]: number;
}

interface Item {
  $id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

const CartPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [cart, setCart] = useState<CartState>({});
  const [items, setItems] = useState<Item[]>([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("genshin-cart");
    if (storedCart) setCart(JSON.parse(storedCart));

    const storedItems = localStorage.getItem("genshin-items");
    if (storedItems) setItems(JSON.parse(storedItems));
  }, []);

  const updateCartInStorage = (newCart: CartState) => {
    localStorage.setItem("genshin-cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const updateQuantity = (itemId: string, change: number) => {
    const newCart = { ...cart };
    const currentQty = newCart[itemId] || 0;
    const newQty = Math.max(0, currentQty + change);
    
    if (newQty === 0) {
      delete newCart[itemId];
    } else {
      newCart[itemId] = newQty;
    }
    
    updateCartInStorage(newCart);
    
    if (newQty === 0) {
      toast.success("Item removed from cart");
    }
  };

  const removeItem = (itemId: string) => {
    const newCart = { ...cart };
    delete newCart[itemId];
    updateCartInStorage(newCart);
    toast.success("Item removed from cart");
  };

  const totalPrice = items.reduce((sum, item) => {
    const qty = cart[item.$id] || 0;
    return sum + qty * (item.price || 0);
  }, 0);

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleClearCart = () => {
    localStorage.removeItem("genshin-cart");
    setCart({});
    toast.success("Cart cleared successfully");
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      handleClearCart();
      
      // Redirect after success animation
      setTimeout(() => {
        router.push("/menu");
      }, 3000);
    }, 2000);
  };

  // Success Animation
  if (paymentSuccess) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
          color: "white",
        }}
      >
        <Container maxWidth="sm">
          <Grow in={true} timeout={800}>
            <Paper
              sx={{
                p: { xs: 4, sm: 6 },
                textAlign: "center",
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
              }}
            >
              <CheckCircleIcon 
                sx={{ 
                  fontSize: { xs: 60, sm: 80 }, 
                  color: "#4caf50", 
                  mb: 2,
                  animation: "bounce 1s ease-in-out"
                }} 
              />
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                fontWeight={800}
                color="black"
                gutterBottom
              >
                Payment Successful! 🎉
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Thank you for choosing FoodZone! Your delicious meal is being prepared.
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: "0.9rem" }}
              >
                Redirecting you back to the menu...
              </Typography>
            </Paper>
          </Grow>
        </Container>
      </Box>
    );
  }

  // Empty Cart
  if (Object.keys(cart).length === 0) {
    return (
      <Box sx={{ minHeight: "80vh", background: "#fafafa" }}>
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
          <Paper
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              textAlign: "center",
              borderRadius: 4,
              background: "white",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            }}
          >
            <ShoppingCartIcon 
              sx={{ 
                fontSize: { xs: 60, sm: 80 }, 
                color: "#fb7185", 
                mb: 2,
                opacity: 0.8
              }} 
            />
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              fontWeight={700}
              color="black"
              gutterBottom
            >
              Your Cart is Empty
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 4, maxWidth: "400px", mx: "auto" }}
            >
              Looks like you haven't added any delicious items to your cart yet. 
              Explore our menu to discover amazing dishes!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<RestaurantMenuIcon />}
              onClick={() => router.push("/menu")}
              sx={{
                background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(15, 118, 110, 0.3)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Explore Menu
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#fafafa" }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
          py: { xs: 3, sm: 4 },
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={2}>
            <ShoppingBagIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
            <Box>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight={800}
              >
                Your Cart
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ opacity: 0.9 }}
              >
                {totalItems} item{totalItems !== 1 ? 's' : ''} • ₹{totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Stack spacing={3}>
          {/* Cart Items */}
          <Paper
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant="h6" 
                fontWeight={700}
                color="black"
                gutterBottom
              >
                Order Items
              </Typography>
              
              <Stack spacing={2}>
                {items.map((item) => {
                  const qty = cart[item.$id] || 0;
                  if (!qty) return null;
                  
                  return (
                    <Fade in={true} key={item.$id}>
                      <Card
                        sx={{
                          background: "#f8f9fa",
                          border: "1px solid rgba(0, 0, 0, 0.05)",
                          borderRadius: 2,
                          "&:hover": {
                            boxShadow: "0 2px 8px rgba(15, 118, 110, 0.15)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2, sm: 3 }, "&:last-child": { pb: { xs: 2, sm: 3 } } }}>
                          <Stack 
                            direction={{ xs: "column", sm: "row" }} 
                            spacing={{ xs: 2, sm: 3 }}
                            alignItems={{ xs: "flex-start", sm: "center" }}
                            justifyContent="space-between"
                          >
                            {/* Item Info */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography 
                                variant="h6" 
                                fontWeight={600}
                                color="black"
                                gutterBottom
                                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                              >
                                {item.name}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ mb: 1 }}
                              >
                                ₹{item.price} each
                              </Typography>
                              <Typography 
                                variant="h6" 
                                color="#fb7185"
                                fontWeight={700}
                              >
                                ₹{(qty * item.price).toFixed(2)}
                              </Typography>
                            </Box>

                            {/* Quantity Controls */}
                            <Stack 
                              direction="row" 
                              alignItems="center" 
                              spacing={1}
                              sx={{ 
                                background: "white", 
                                borderRadius: 2, 
                                p: 1,
                                border: "1px solid rgba(0, 0, 0, 0.1)"
                              }}
                            >
                              <IconButton 
                                onClick={() => updateQuantity(item.$id, -1)}
                                size="small"
                                sx={{ color: "#fb7185" }}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Typography 
                                variant="body1" 
                                fontWeight={600}
                                sx={{ minWidth: 24, textAlign: "center" }}
                              >
                                {qty}
                              </Typography>
                              <IconButton 
                                onClick={() => updateQuantity(item.$id, 1)}
                                size="small"
                                sx={{ color: "#fb7185" }}
                              >
                                <AddIcon />
                              </IconButton>
                            </Stack>

                            {/* Remove Button */}
                            <IconButton 
                              onClick={() => removeItem(item.$id)}
                              sx={{ 
                                color: "#fb7185",
                                "&:hover": { background: "rgba(251, 113, 133, 0.1)" }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Fade>
                  );
                })}
              </Stack>
            </Box>
          </Paper>

          {/* Order Summary */}
          <Paper
            sx={{
              background: "white",
              borderRadius: 3,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(15, 118, 110, 0.15)",
            }}
          >
            <Box sx={{ p: { xs: 3, sm: 4 } }}>
              <Typography 
                variant="h6" 
                fontWeight={700}
                color="black"
                gutterBottom
              >
                Order Summary
              </Typography>
              
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Subtotal ({totalItems} items)</Typography>
                  <Typography variant="body1" fontWeight={600}>₹{totalPrice.toFixed(2)}</Typography>
                </Stack>
                
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Delivery Fee</Typography>
                  <Typography variant="body1" fontWeight={600} color="#0f766e">Free</Typography>
                </Stack>
                
                <Divider sx={{ my: 1 }} />
                
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" fontWeight={700}>Total</Typography>
                  <Typography variant="h6" fontWeight={700} color="#fb7185">
                    ₹{totalPrice.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Paper>

          {/* Action Buttons */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Button
              variant="outlined"
              startIcon={<ClearAllIcon />}
              onClick={handleClearCart}
              sx={{
                color: "#fb7185",
                borderColor: "#fb7185",
                py: 1.5,
                borderRadius: "30px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#fb7185",
                  background: "rgba(251, 113, 133, 0.05)",
                },
              }}
            >
              Clear Cart
            </Button>
            
            <Button
              variant="contained"
              fullWidth
              startIcon={<PaymentIcon />}
              onClick={handleCheckout}
              disabled={isProcessing}
              sx={{
                background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
                color: "white",
                py: 1.5,
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 20px rgba(15, 118, 110, 0.3)",
                },
                "&:disabled": {
                  background: "rgba(15, 118, 110, 0.5)",
                  color: "rgba(255, 255, 255, 0.7)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {isProcessing ? "Processing Payment..." : `Proceed to Checkout • ₹${totalPrice.toFixed(2)}`}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CartPage;
