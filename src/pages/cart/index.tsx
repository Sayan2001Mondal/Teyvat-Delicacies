"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
} from "@mui/material";
import { useRouter } from "next/router";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface CartState {
  [id: string]: number;
}

interface Item {
  $id: string;
  name: string;
  price: number;
}

const CartPage: FC = () => {
  const [cart, setCart] = useState<CartState>({});
  const [items, setItems] = useState<Item[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("genshin-cart");
    if (storedCart) setCart(JSON.parse(storedCart));

    const storedItems = localStorage.getItem("genshin-items");
    if (storedItems) setItems(JSON.parse(storedItems));
  }, []);

  const totalPrice = items.reduce((sum, item) => {
    const qty = cart[item.$id] || 0;
    return sum + qty * (item.price || 0);
  }, 0);

  const handleClearCart = () => {
    localStorage.removeItem("genshin-cart");
    setCart({});
  };

  const handleConfirmCheckout = () => {
    setCheckoutOpen(false);
    // Simulate payment process
    setTimeout(() => {
      setPaymentSuccess(true);
      handleClearCart();
      // Redirect back to menu after animation
      setTimeout(() => {
        router.push("/menu");
      }, 2500);
    }, 500);
  };

  if (paymentSuccess) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 10,
          animation: "fadeIn 0.6s ease-in-out",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "scale(0.8)" },
            to: { opacity: 1, transform: "scale(1)" },
          },
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 80, color: "green" }} />
        <Typography variant="h4" sx={{ mt: 2 }}>
          Payment Successful!
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Thank you for your order.
        </Typography>
      </Box>
    );
  }

  if (Object.keys(cart).length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty.
        </Typography>
        <Button variant="contained" onClick={() => router.push("/menu")}>
          Back to Menu
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dish</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const qty = cart[item.$id] || 0;
              if (!qty) return null;
              return (
                <TableRow key={item.$id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price} Mora</TableCell>
                  <TableCell>{qty}</TableCell>
                  <TableCell>{qty * (item.price || 0)} Mora</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" sx={{ mt: 3 }}>
        Total: {totalPrice} Mora
      </Typography>

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="outlined" onClick={handleClearCart}>
          Clear Cart
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCheckoutOpen(true)}
        >
          Proceed to Checkout
        </Button>
      </Box>

      {/* Checkout Confirmation Modal */}
      <Modal open={checkoutOpen} onClose={() => setCheckoutOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 300,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Order
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Are you sure you want to place this order?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="outlined" onClick={() => setCheckoutOpen(false)}>
              No
            </Button>
            <Button variant="contained" onClick={handleConfirmCheckout}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CartPage;
