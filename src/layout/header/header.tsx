"use client";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Stack,
  InputBase,
  IconButton,
  Paper,
  useScrollTrigger,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { account } from "@/hooks/utils/appwrite";
import { toast } from "sonner";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";

interface HeaderProps {
  window?: () => Window;
}

const Header = (props: HeaderProps) => {
  const { window } = props;
  const router = useRouter();
  

  
  const isMobile = useMediaQuery("(max-width:1100px)");

  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartItems] = useState(0); 

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  useEffect(() => {
    const checkAuth = () => {
      account
        .get()
        .then((res) => setUser(res))
        .catch(() => setUser(null));
    };

    checkAuth();
    
    
    const handleRouteChange = () => checkAuth();
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  
  useEffect(() => {
    if (router.isReady && router.query.search) {
      setSearchQuery(decodeURIComponent(router.query.search as string));
    }
  }, [router.isReady, router.query.search]);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      toast.success("Logged out successfully");
      setUser(null);
      setUserMenuAnchor(null);
      router.push("/");
    } catch {
      toast.error("Error logging out");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      
      setMobileOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (router.pathname === "/menu" && router.query.search) {
      router.push("/menu");
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCartClick = () => router.push("/cart");

  const navigationItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Menu", href: "/menu", icon: RestaurantIcon },
    { name: "About", href: "/about", icon: InfoIcon },
    { name: "Contact", href: "/contact", icon: ContactMailIcon },
  ];

  const isActivePage = (href: string) => {
    if (href === "/" && router.pathname === "/") return true;
    if (href !== "/" && router.pathname.startsWith(href)) return true;
    return false;
  };

  const NavLinks = ({ mobile = false }) => (
    <Stack
      direction={mobile ? "column" : "row"}
      spacing={mobile ? 1 : 0}
      sx={{ width: mobile ? "100%" : "auto" }}
    >
      {navigationItems.map((item) => {
        const isActive = isActivePage(item.href);
        const IconComponent = item.icon;

        return (
          <Button
            key={item.name}
            component={Link as any}
            href={item.href}
            startIcon={mobile ? <IconComponent /> : undefined}
            onClick={() => mobile && setMobileOpen(false)}
            sx={{
              color: isActive ? "#961c59ff" : "#f6f7faff",
              fontWeight: isActive ? 700 : 500,
              fontSize: mobile ? "1.05rem" : "1rem",
              px: mobile ? 2 : 2.25,
              py: mobile ? 1.25 : 0.75,
              mx: mobile ? 0 : 0.25,
              
              position: "relative",
              textTransform: "none",
              justifyContent: mobile ? "flex-start" : "center",
              width: mobile ? "100%" : "auto",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#961c59ff",
              
              },
              ...(isActive &&
                mobile && {
                  background: "rgba(150, 28, 89, 0.1)",
                  borderLeft: "4px solid #961c59ff",
                }),
            }}
          >
            {item.name}
          </Button>
        );
      })}
    </Stack>
  );

  const SearchInput = ({ mobile = false }) => (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "22px",
        border: "1px solid rgba(255, 207, 108, 0.25)",
        background: mobile 
          ? "rgba(255, 255, 255, 0.1)" 
          : "rgba(255, 255, 255, 0.08)",
        width: mobile ? "100%" : { md: 220, lg: 280, xl: 320 },
        flexShrink: 0,
      }}
    >
      <IconButton 
        type="submit"
        sx={{ color: "#ffcf6c", ml: 1 }}
        disabled={!searchQuery.trim()}
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder={mobile ? "Search food..." : "Search delicious food..."}
        value={searchQuery}
        onChange={handleSearchInputChange}
        sx={{
          flex: 1,
          color: "#ffcf6c",
          px: 1,
          "& input::placeholder": {
            color: mobile 
              ? "rgba(173, 47, 110, 0.7)"
              : "rgba(255, 207, 108, 0.7)",
          },
        }}
      />
      {searchQuery && (
        <IconButton
          onClick={clearSearch}
          sx={{ 
            color: "#2849a3ff", 
            mr: 1,
            "&:hover": {
              background: "rgba(255, 207, 108, 0.1)",
            }
          }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </Paper>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          background: trigger
            ? "rgba(229, 225, 238, 0.95)"
            : "",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 4 },
            py: 1,
            minHeight: { xs: 70, sm: 80 },
            gap: 2,
          }}
        >
          {/* Logo */}
          <Box
            component={Link as any}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              cursor: "pointer",
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #961c59ff, #ffcf6c)",
                
                p: 1,
                mr: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <RestaurantIcon sx={{ fontSize: { xs: 24, sm: 26 }, color: "white" }} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.45rem", sm: "1.7rem", md: "1.9rem" },
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                FoodHub
              </Typography>
              <Typography
                sx={{
                  display: { xs: "none", md: "block", lg: "block" },
                  fontSize: { md: "0.72rem", lg: "0.8rem" },
                  color: "#276c81ff",
                  fontWeight: 500,
                  letterSpacing: 2,
                  opacity: 0.9,
                }}
              >
                Delicious Food
              </Typography>
            </Box>
          </Box>

          {/* Desktop block (hidden at <=1100px) */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                minWidth: 0,
              }}
            >
              <NavLinks />
              <SearchInput />

              {/* Cart */}
              <IconButton onClick={handleCartClick} sx={{ color: "#ffcf6c", flexShrink: 0 }}>
                <Badge badgeContent={cartItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* User */}
              {user ? (
                <>
                  <Button
                    onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      color: "#ffcf6c",
                      background: "rgba(150, 28, 89, 0.2)",
                      border: "1px solid rgba(150, 28, 89, 0.3)",
                      borderRadius: "22px",
                      px: 2,
                      textTransform: "none",
                      flexShrink: 0,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        mr: 1,
                        background: "linear-gradient(135deg, #961c59ff, #ffcf6c)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box
                      component="span"
                      sx={{
                        maxWidth: 120,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                        textAlign: "left",
                      }}
                    >
                      {user.name || "User"}
                    </Box>
                  </Button>

                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={() => setUserMenuAnchor(null)}
                    PaperProps={{
                      sx: {
                        background: "rgba(17, 11, 29, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 207, 108, 0.2)",
                        borderRadius: 2,
                        mt: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => setUserMenuAnchor(null)}
                      sx={{ color: "#ffcf6c", "&:hover": { background: "rgba(255, 207, 108, 0.1)" } }}
                    >
                      <PersonIcon sx={{ mr: 1 }} /> Profile
                    </MenuItem>
                    <Divider sx={{ borderColor: "rgba(255, 207, 108, 0.2)" }} />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ color: "#ffcf6c", "&:hover": { background: "rgba(255, 207, 108, 0.1)" } }}
                    >
                      <LogoutIcon sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                  <Button
                    component={Link as any}
                    href="/login"
                    startIcon={<LoginIcon />}
                    sx={{
                      color: "#ffcf6c",
                      border: "1px solid rgba(255, 207, 108, 0.5)",
                      borderRadius: "22px",
                      px: 2,
                      textTransform: "none",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link as any}
                    href="/registration"
                    startIcon={<PersonAddIcon />}
                    sx={{
                      background: "linear-gradient(135deg, #961c59ff, #ffcf6c)",
                      color: "white",
                      borderRadius: "22px",
                      px: 2,
                      textTransform: "none",
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              )}
            </Box>
          )}

          {/* Mobile block (<=1100px) */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
              <IconButton onClick={handleCartClick} sx={{ color: "#ffcf6c" }}>
                <Badge badgeContent={cartItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "#ffcf6c" }}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            background: "linear-gradient(180deg, #110b1dff 0%, #1a0f2e 100%)",
            color: "#ffcf6c",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" fontWeight={700} color="#961c59ff">
              Menu
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#ffcf6c" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Search */}
          <Box sx={{ mb: 3 }}>
            <SearchInput mobile />
          </Box>

          {/* Mobile Navigation */}
          <NavLinks mobile />

          {/* Mobile Auth */}
          <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255, 207, 108, 0.2)" }}>
            {user ? (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ background: "linear-gradient(135deg, #961c59ff, #ffcf6c)", mr: 2 }}>
                    {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </Avatar>
                  <Typography fontWeight={600}>{user.name || "User"}</Typography>
                </Box>
                <Button
                  fullWidth
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    color: "#ffcf6c",
                    border: "1px solid rgba(255, 207, 108, 0.5)",
                    borderRadius: "22px",
                    py: 1.25,
                    textTransform: "none",
                  }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Stack spacing={2}>
                <Button
                  fullWidth
                  component={Link as any}
                  href="/login"
                  startIcon={<LoginIcon />}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    color: "#ffcf6c",
                    border: "1px solid rgba(255, 207, 108, 0.5)",
                    borderRadius: "22px",
                    py: 1.25,
                    textTransform: "none",
                  }}
                >
                  Login
                </Button>
                <Button
                  fullWidth
                  component={Link as any}
                  href="/registration"
                  startIcon={<PersonAddIcon />}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    background: "linear-gradient(135deg, #961c59ff, #ffcf6c)",
                    color: "white",
                    borderRadius: "22px",
                    py: 1.25,
                    textTransform: "none",
                  }}
                >
                  Register
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Spacer for fixed header */}
      <Toolbar sx={{ minHeight: { xs: 70, sm: 80 } }} />
    </>
  );
};

export default Header;