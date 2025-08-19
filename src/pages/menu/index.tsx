"use client";

import { FC, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  databases as appwriteDatabases,
  storage as appwriteStorage,
} from "@/hooks/utils/appwrite";
import { Query, type ImageGravity, ImageFormat } from "appwrite";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Pagination,
  IconButton,
  Button,
} from "@mui/material";
import Head from "next/head";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/router";

interface Dish {
  $id: string;
  name: string;
  price?: number;
  imageUrl?: string;
}

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const FOODS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

const ITEMS_PER_PAGE = 9;
const GRAVITY: ImageGravity = "center";
const FORMAT: ImageFormat = ImageFormat.Jpeg;

const MenuPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const router = useRouter();

  
  useEffect(() => {
    const storedCart = localStorage.getItem("genshin-cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const saveCart = (updatedCart: typeof cart) => {
    setCart(updatedCart);
    localStorage.setItem("genshin-cart", JSON.stringify(updatedCart));
  };

  const { data, isLoading, isError } = useQuery<Dish[]>({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await appwriteDatabases.listDocuments<Dish>(
        DATABASE_ID,
        FOODS_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );

      
      localStorage.setItem("genshin-items", JSON.stringify(res.documents));

      return res.documents;
    },
  });

  const getImageUrl = (imageUrl: string) => {
    try {
      if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
        return imageUrl;
      }
      return appwriteStorage
        .getFilePreview(
          BUCKET_ID,
          imageUrl,
          400,
          300,
          GRAVITY,
          85,
          0,
          undefined,
          0,
          1,
          0,
          "#FFFFFF",
          FORMAT
        )
        .toString();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return "";
    }
  };

  const handleQuantityChange = (dishId: string, delta: number) => {
    const newQuantity = (cart[dishId] || 0) + delta;
    if (newQuantity < 0) return;
    const updatedCart = { ...cart, [dishId]: newQuantity };
    if (newQuantity === 0) delete updatedCart[dishId];
    saveCart(updatedCart);
  };

  // Pagination
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = data?.slice(startIndex, endIndex) || [];

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Menu | Genshin Food App</title>
      </Head>

      <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h3" align="center" sx={{ mb: 4 }}>
          Our Menu
        </Typography>

        {Object.keys(cart).length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/cart")}
            >
              Proceed to Cart ({Object.values(cart).reduce((a, b) => a + b, 0)}{" "}
              items)
            </Button>
          </Box>
        )}

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {isError && (
          <Typography color="error" align="center" sx={{ mt: 8 }}>
            Failed to load menu items.
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: 4,
            justifyContent: "flex-start",
          }}
        >
          {currentItems.map((dish) => (
            <Box
              key={dish.$id}
              sx={{
                flex: "0 0 calc(33.333% - 16px)",
                minWidth: "280px",
                "@media (max-width: 900px)": {
                  flex: "0 0 calc(50% - 12px)",
                },
                "@media (max-width: 600px)": {
                  flex: "0 0 100%",
                },
              }}
            >
              <Card
                sx={{ height: "100%", display: "flex", flexDirection: "column" }}
              >
                {dish.imageUrl && (
                  <CardMedia
                    component="img"
                    sx={{ height: 220, objectFit: "cover" }}
                    image={getImageUrl(dish.imageUrl)}
                    alt={dish.name}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{dish.name}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {dish.price ? `${dish.price} Mora` : "Price N/A"}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleQuantityChange(dish.$id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{cart[dish.$id] || 0}</Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleQuantityChange(dish.$id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default MenuPage;
