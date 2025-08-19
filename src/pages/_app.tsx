import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import Wrapper from "@/layout/wrapper/wrapper";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { restaurantTheme } from "@/mui-theme/mui-theme/theme";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={restaurantTheme}>
      <CssBaseline /> {/* resets styles for consistent UI */}
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </QueryClientProvider>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}
