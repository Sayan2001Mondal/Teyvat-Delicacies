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
  Container,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Fab,
  Badge,
  Skeleton,
  Alert,
} from "@mui/material";
import Head from "next/head";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useRouter } from "next/router";

interface Dish {
  $id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  type?: string;
  nation?: string;
  category?: string;
}

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const FOODS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

const ITEMS_PER_PAGE = 12;
const GRAVITY: ImageGravity = "center";
const FORMAT: ImageFormat = ImageFormat.Jpeg;

const MenuPage: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

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

  const handleImageError = (dishId: string) => {
    setImageLoadErrors(prev => new Set([...prev, dishId]));
  };

  // Get unique categories
  const categories = data 
    ? ["all", ...new Set(data.map(dish => dish.category || dish.type || "other").filter(Boolean))]
    : ["all"];

  // Filter data by category
  const filteredData = data?.filter(dish => 
    selectedCategory === "all" || 
    dish.category === selectedCategory || 
    dish.type === selectedCategory ||
    (selectedCategory === "other" && !dish.category && !dish.type)
  ) || [];

  // Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const LoadingSkeleton = () => (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column",
      gap: 3,
    }}>
      {[...Array(6)].map((_, index) => (
        <Box key={index} sx={{
          width: "100%",
          maxWidth: isXs ? "100%" : isSm ? "calc(50% - 12px)" : "calc(33.333% - 16px)",
        }}>
          <Card sx={{ height: 400 }}>
            <Skeleton variant="rectangular" height={220} />
            <CardContent>
              <Skeleton variant="text" height={32} width="80%" />
              <Skeleton variant="text" height={24} width="60%" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={20} width="40%" />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width={30} height={24} />
                <Skeleton variant="circular" width={40} height={40} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <Head>
        <title>Menu | FoodZone</title>
        <meta name="description" content="Explore our delicious menu at FoodZone. Fresh ingredients, authentic flavors, delivered to your door." />
      </Head>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #0f766e 0%, #14b8a6 100%)",
          color: "white",
          py: { xs: 6, sm: 8, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <RestaurantIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, mb: 2, opacity: 0.9 }} />
            <Typography
              variant={isXs ? "h3" : isSm ? "h2" : "h1"}
              fontWeight={800}
              gutterBottom
              sx={{ color: "white" }}
            >
              Our Menu
            </Typography>
            <Typography
              variant={isXs ? "body1" : "h6"}
              sx={{ maxWidth: "600px", mx: "auto", opacity: 0.95, fontWeight: 500 }}
            >
              Discover our carefully crafted dishes made with the finest ingredients and authentic flavors
            </Typography>
          </Box>
        </Container>

        
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            zIndex: 1,
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, sm: 6 } }}>
        {/* Category Filters */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1, 
              color: "#333",
              fontWeight: 600
            }}
          >
            <FilterListIcon /> Categories
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              flexWrap: "wrap", 
              gap: 1,
              "& > *": { mb: 1 }
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category}
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                onClick={() => handleCategoryChange(category)}
                variant={selectedCategory === category ? "filled" : "outlined"}
                sx={{
                  backgroundColor: selectedCategory === category ? " #0f766e" : "transparent",
                  color: selectedCategory === category ? "white" : " #0f766e",
                  borderColor: "#ff3d00",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: selectedCategory === category ? " #0f766e" : "rgba(255, 61, 0, 0.08)",
                  }
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Cart Summary */}
        {totalCartItems > 0 && (
          <Box sx={{ 
            mb: 4, 
            p: 3, 
            background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
            borderRadius: 3,
            border: "1px solid #ffcc02",
            boxShadow: "0 2px 8px rgba(255, 61, 0, 0.1)"
          }}>
            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
              spacing={2}
            >
              <Typography variant="h6" color=" #0f766e" fontWeight={700}>
                🛒 {totalCartItems} item{totalCartItems !== 1 ? "s" : ""} in cart
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push("/cart")}
                startIcon={<ShoppingCartIcon />}
                sx={{
                  background: " #0f766e",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: "25px",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(255, 61, 0, 0.3)",
                  "&:hover": {
                    background: " #0f766e",
                    boxShadow: "0 6px 16px rgba(255, 61, 0, 0.4)",
                  }
                }}
              >
                Proceed to Cart
              </Button>
            </Stack>
          </Box>
        )}

        {/* Error State */}
        {isError && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontSize: "1.1rem"
              }
            }}
          >
            Failed to load menu items. Please try refreshing the page.
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Menu Items */}
        {!isLoading && !isError && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, sm: 3 },
              mb: 4,
            }}
          >
            {currentItems.map((dish) => (
              <Box
                key={dish.$id}
                sx={{
                  flex: {
                    xs: "1 1 100%",
                    sm: "1 1 calc(50% - 12px)",
                    md: "1 1 calc(33.333% - 16px)",
                    lg: "1 1 calc(25% - 18px)",
                  },
                  minWidth: { xs: "280px", sm: "300px" },
                  maxWidth: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)", lg: "calc(25% - 18px)" },
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(255, 61, 0, 0.15)",
                    }
                  }}
                  onClick={() => router.push(`/menu/${dish.$id}`)}
                >
                  {dish.imageUrl && !imageLoadErrors.has(dish.$id) ? (
                    <CardMedia
                      component="img"
                      sx={{ 
                        height: { xs: 200, sm: 220, md: 240 }, 
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)"
                        }
                      }}
                      image={getImageUrl(dish.imageUrl)}
                      alt={dish.name}
                      onError={() => handleImageError(dish.$id)}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: { xs: 200, sm: 220, md: 240 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(180deg, #0f766e 0%, #14b8a6 100%)",
                        color: "white"
                      }}
                    >
                      <RestaurantIcon sx={{ fontSize: 60, opacity: 0.7 }} />
                    </Box>
                  )}
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight={700}
                      gutterBottom
                      sx={{ 
                        color: "#333",
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {dish.name}
                    </Typography>

                    {dish.description && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.4
                        }}
                      >
                        {dish.description}
                      </Typography>
                    )}

                    <Typography 
                      variant="h6" 
                      fontWeight={700}
                      sx={{ 
                        color: "#0f766e", 
                        mb: 2,
                        fontSize: "1.25rem"
                      }}
                    >
                      {dish.price ? `₹${dish.price}` : "Price N/A"}
                    </Typography>

                    {(dish.type || dish.nation) && (
                      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}>
                        {dish.type && (
                          <Chip 
                            label={dish.type} 
                            size="small" 
                            sx={{ 
                              backgroundColor: "#fff3e0",
                              color: "#0f766e",
                              fontWeight: 500
                            }} 
                          />
                        )}
                        {dish.nation && (
                          <Chip 
                            label={dish.nation} 
                            size="small" 
                            sx={{ 
                              backgroundColor: "#f3e5f5",
                              color: "#7b1fa2",
                              fontWeight: 500
                            }} 
                          />
                        )}
                      </Stack>
                    )}

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(dish.$id, -1);
                          }}
                          disabled={!cart[dish.$id]}
                          sx={{
                            backgroundColor: "#ffebee",
                            color: "#0f766e",
                            "&:hover": {
                              backgroundColor: "#ffcdd2",
                            },
                            "&:disabled": {
                              backgroundColor: "#f5f5f5",
                              color: "#ccc"
                            }
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        
                        <Typography 
                          variant="h6" 
                          fontWeight={600}
                          sx={{ 
                            minWidth: 30, 
                            textAlign: "center",
                            color: "#0f766e"
                          }}
                        >
                          {cart[dish.$id] || 0}
                        </Typography>
                        
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(dish.$id, 1);
                          }}
                          sx={{
                            backgroundColor: "#0f766e",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#0f766e",
                            }
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}

        {/* Empty State */}
        {!isLoading && !isError && currentItems.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <RestaurantIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No items found in this category
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try selecting a different category or check back later!
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size={isXs ? "small" : "medium"}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#0f766e",
                  "&.Mui-selected": {
                    backgroundColor: "#0f766e",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#0f766e",
                    }
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 61, 0, 0.08)",
                  }
                }
              }}
            />
          </Box>
        )}
      </Container>

      {/* Floating Cart Button */}
      {totalCartItems > 0 && (
        <Fab
          onClick={() => router.push("/cart")}
          sx={{
            position: "fixed",
            bottom: { xs: 20, sm: 30 },
            right: { xs: 20, sm: 30 },
            backgroundColor: "#0f766e",
            color: "white",
            zIndex: 1000,
            boxShadow: "0 8px 24px rgba(255, 61, 0, 0.3)",
            "&:hover": {
              backgroundColor: "#0f766e",
              boxShadow: " 0 12px 32px rgba(255, 61, 0, 0.4)",
            }
          }}
        >
          <Badge badgeContent={totalCartItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      )}
    </>
  );
};

export default MenuPage;