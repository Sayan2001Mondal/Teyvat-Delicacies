import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { CircularProgress, Box } from "@mui/material";


const LoadingComponent = () => (
  <Box display="flex" justifyContent="center" p={2}>
    <CircularProgress />
  </Box>
);

const Header = dynamic(() => import("@/layout/header/header"), {
  ssr: false,
  loading: () => <LoadingComponent />
});

const Footer = dynamic(() => import("@/layout/footer/footer"), {
  ssr: false,
  loading: () => <LoadingComponent />
});

interface WrapperProps {
    children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Wrapper;