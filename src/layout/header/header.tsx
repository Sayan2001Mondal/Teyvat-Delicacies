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
import SearchInput from "@/hooks/utils/services/searchInput";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LockResetIcon from "@mui/icons-material/LockReset"

interface HeaderProps {
  window?: () => Window;
}

const Header = (props: HeaderProps) => {
  const { window } = props
  const router = useRouter()
  const theme = useTheme()
  
  // Updated media queries to match your breakpoint structure
  const isMobile = useMediaQuery(theme.breakpoints.down('lg')) // Below 1200px
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')) // 900px - 1200px
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')) // Above 1200px

  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartItems] = useState(0);

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  })

  useEffect(() => {
    const checkAuth = () => {
      account
        .get()
        .then((res) => setUser(res))
        .catch(() => setUser(null));
    }

    checkAuth()
    
    const handleRouteChange = () => checkAuth()
    router.events.on('routeChangeComplete', handleRouteChange)
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    };
  }, [router.events])

  useEffect(() => {
    if (router.isReady && router.query.search) {
      setSearchQuery(decodeURIComponent(router.query.search as string))
    }
  }, [router.isReady, router.query.search])

  const handleLogout = async () => {
    try {
      await account.deleteSession("current")
      toast.success("Logged out successfully")
      setUser(null)
      setUserMenuAnchor(null)
      router.push("/")
    } catch {
      toast.error("Error logging out")
    }
  };

  const handleCartClick = () => router.push("/cart")

  const navigationItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Menu", href: "/menu", icon: RestaurantIcon },
    { name: "About", href: "/about", icon: InfoIcon },
    { name: "Contact", href: "/contact", icon: ContactMailIcon },
  ]

  const isActivePage = (href: string) => {
    if (href === "/" && router.pathname === "/") return true;
    if (href !== "/" && router.pathname.startsWith(href)) return true;
    return false
  };

  const NavLinks = ({ mobile = false }) => (
    <Stack
      direction={mobile ? "column" : "row"}
      spacing={mobile ? 1 : 0}
      sx={{ width: mobile ? "100%" : "auto" }}
    >
      {navigationItems.map((item) => {
        const isActive = isActivePage(item.href)
        const IconComponent = item.icon

        return (
          <Button
            key={item.name}
            component={Link as any}
            href={item.href}
            startIcon={mobile ? <IconComponent /> : undefined}
            onClick={() => mobile && setMobileOpen(false)}
            sx={{
              color: "white",
              fontWeight: isActive ? 700 : 500,
              textUnderlinePosition: "under", 
              fontSize: mobile ? "1.05rem" : "1rem",
              textDecoration: isActive ? "underline" : "none",
              textDecorationColor: isActive ? (mobile ? "#fb7185" : "#fb7185") : "transparent", // Coral accent
              px: mobile ? 2 : 2.25,
              py: mobile ? 1.25 : 0.75,
              mx: mobile ? 0 : 0.25,
              position: "relative",
              textTransform: "none",
              justifyContent: mobile ? "flex-start" : "center",
              width: mobile ? "100%" : "auto",
              transition: "all 0.2s ease",
              "&:hover": {
                color: mobile ? "#fb7185" : "#fb7185", // Coral hover
                background: mobile ? "rgba(251, 113, 133, 0.1)" : "transparent",
              },
              ...(isActive &&
                mobile && {
                  background: "rgba(251, 113, 133, 0.15)", // Coral background for active mobile
                  borderLeft: "4px solid #fb7185", // Coral left border
                }),
            }}
          >
            {item.name}
          </Button>
        )
      })}
    </Stack>
  )

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)", // Teal gradient
          boxShadow: "0 4px 20px rgba(15, 118, 110, 0.3)", // Teal shadow
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 70, sm: 80 },
            py: 0,
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
                p: 1,
                mr: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <RestaurantIcon sx={{ 
                fontSize: { xs: 24, sm: 26 }, 
                color: "#fb7185" // Coral icon
              }} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  backgroundClip: "text",
                  color: "white",
                  fontSize: { xs: "1.45rem", sm: "1.7rem", md: "1.9rem" },
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                FoodZone
              </Typography>
              <Typography
                sx={{
                  display: { xs: "none", md: "block", lg: "block" },
                  fontSize: { md: "0.72rem", lg: "0.8rem" },
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 500,
                  letterSpacing: 2,
                  opacity: 0.9,
                }}
              >
                Delicious Food
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation (shown on lg+ screens) */}
          {isDesktop && (
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
              <IconButton onClick={handleCartClick} sx={{ 
                color: "white",
                flexShrink: 0,
                "&:hover": {
                  color: "#fb7185", // Coral hover
                  background: "rgba(251, 113, 133, 0.1)",
                }
              }}>
                <Badge 
                  badgeContent={cartItems} 
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#fb7185', // Coral badge
                      color: 'white',
                    }
                  }}
                >
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
                      color: "white",
                      background: "rgba(251, 113, 133, 0.2)", // Coral background
                      border: "1px solid rgba(251, 113, 133, 0.4)", // Coral border
                      borderRadius: "22px",
                      px: 2,
                      textTransform: "none",
                      flexShrink: 0,
                      "&:hover": {
                        background: "rgba(251, 113, 133, 0.3)", // Coral hover
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        mr: 1,
                        fontSize: "0.8rem",
                        backgroundColor: "#fb7185", // Coral avatar
                        color: "white",
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
                        background: "white",
                        border: "1px solid #0f766e", // Teal border
                        mt: 1,
                        borderRadius: 2,
                      },
                    }}
                  >
                    {user.labels?.includes("admin") && (
                      <MenuItem 
                        component={Link as any} 
                        href="/admin/menu" 
                        onClick={() => setUserMenuAnchor(null)}
                        sx={{
                          color: "#0f766e", // Teal text
                          "&:hover": { 
                            background: "rgba(251, 113, 133, 0.1)" // Coral hover
                          }
                        }}
                      >
                        <AdminPanelSettingsIcon sx={{mr : 1, color: "#fb7185"}} />Admin Panel
                      </MenuItem>
                    )}

                    <Divider sx={{borderColor: "#0f766e"}}/>

                    <MenuItem
                      onClick={handleLogout}
                      sx={{ 
                        color: "#0f766e", // Teal text
                        "&:hover": { 
                          background: "rgba(251, 113, 133, 0.1)" // Coral hover
                        } 
                      }}
                    >
                      <LogoutIcon sx={{ mr: 1, color: "#fb7185" }} /> Logout
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
                      color: "white",
                      boxShadow: "none",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      transition: "all 0.3s ease",
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      borderRadius: 2,
                      "&:hover": {
                        cursor: 'pointer',
                        background: "rgba(255, 255, 255, 0.1)",
                        borderColor: "white",
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link as any}
                    href="/registration"
                    startIcon={<PersonAddIcon />}
                    sx={{
                      color: "white",
                      background: "#fb7185", // Coral background
                      border: "1px solid #fb7185", // Coral border
                      px: 2,
                      py: 1,
                      textTransform: "none",
                      borderRadius: 2,
                      "&:hover": {
                        cursor: "pointer",
                        background: "#f43f5e", // Darker coral on hover
                        borderColor: "#f43f5e",
                      }
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              )}
            </Box>
          )}

          {/* Mobile/Tablet Navigation (shown below lg) */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
              <IconButton onClick={handleCartClick} sx={{ 
                color: "white",
                "&:hover": {
                  color: "#fb7185",
                }
              }}>
                <Badge 
                  badgeContent={cartItems}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#fb7185',
                      color: 'white',
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton onClick={() => setMobileOpen(true)} sx={{ 
                color: "white",
                "&:hover": {
                  color: "#fb7185",
                }
              }}>
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
            width: { xs: 280, sm: 320 },
            background: "linear-gradient(180deg, #0f766e 0%, #14b8a6 100%)", // Teal gradient
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" fontWeight={700} color="white">
              Menu
            </Typography>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ 
              color: "white",
              "&:hover": {
                color: "#fb7185",
              }
            }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Search */}
          <Box sx={{ mb: 3 }}>
            <SearchInput />
          </Box>

          {/* Mobile Navigation */}
          <NavLinks mobile />

          {/* Mobile Auth */}
          <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}>
            {user ? (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ 
                    background: "#fb7185", // Coral avatar
                    color: "white",
                    mr: 2 
                  }}>
                    {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </Avatar>
                  <Typography fontWeight={600} color="white">
                    {user.name || "User"}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    py: 1.25,
                    textTransform: "none",
                    "&:hover": {
                      background: "rgba(251, 113, 133, 0.2)", // Coral hover
                      borderColor: "#fb7185",
                    }
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
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    py: 1.25,
                    textTransform: "none",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    }
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
                    background: "#fb7185", // Coral background
                    color: "white",
                    borderRadius: "22px",
                    py: 1.25,
                    textTransform: "none",
                    "&:hover": {
                      background: "#f43f5e", // Darker coral
                    }
                  }}
                >
                  Register
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;