import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Paper,
  Badge,

  
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { databases, Query } from "../appwrite";
import type { MenuItem } from "../../../interfaces/interface";

export default function SearchInput() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (value: string) => {
    setSearchQuery(value)
    if (!value.trim()) {
      setResults([])
      return;
    }

    try {
      setLoading(true);
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
        [Query.search("name", value)]
      );
      setResults(res.documents as unknown as MenuItem[]);
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  };

  const handleSelect = (name: string) => {
    setSearchQuery("");
    setResults([]);
    router.push(`/menu?query=${encodeURIComponent(name)}`)
  }
  return(
   <>
  <Box sx={{ position: "relative", width: { xs: "100%", sm: 220, md: 280, lg: 320 } }}>
    {/* Search box */}
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchQuery);
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "22px",
        border: "1px solid rgba(255, 207, 108, 0.25)",
        background: "white",
        width: "100%",
      }}
    >
      <IconButton
        type="submit"
        sx={{ color: "#4dabf5", ml: 1 }}
        disabled={!searchQuery.trim()}
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search delicious food..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{
          flex: 1,
          color: "black",
          px: 1,
          "& input::placeholder": {
            color: "dark-grey",
          },
        }}
      />
    </Paper>

    {/* Dropdown results */}
    {searchQuery && results.length > 0 && (
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          bgcolor: "white",
          border: "1px solid #201818ff",
          borderRadius: 2,
          mt: 1,
          boxShadow: 3,
          zIndex: 2000,
          maxHeight: 250,
          overflowY: "auto",
          color: "black",
          fontSize: "0.9rem",

        }}
      >
        {results.map((item) => (
          <Link
            key={item.$id}
            href={`/menu/${item.$id}`}
            onClick={() => handleSelect(item.name)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="body2"
              sx={{
                p: 1,
                borderBottom: "1px solid #eee",
                "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
              }}
            >
              {item.name}
            </Typography>
          </Link>
        ))}
      </Box>
    )}

    {/* Optional: no results message */}
    {searchQuery && !loading && results.length === 0 && (
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          bgcolor: "white",
          border: "1px solid #ddd",
          borderRadius: 2,
          mt: 1,
          boxShadow: 3,
          zIndex: 2000,
          p: 1,
          color: "gray",
          fontSize: "0.85rem",
        }}
      >
        No results found
      </Box>
    )}
  </Box>



    </>
  )
}
  