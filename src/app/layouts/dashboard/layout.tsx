import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "@components/layout/Sidebar";
import TopBar from "@components/layout/TopBar";
import { Outlet } from "react-router";
import { useState } from "react";

const DashboardLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <Flex h="100vh" bg="cream.50" overflow="hidden">
            {/* Sidebar Left */}
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            {/* Main Content Area Right */}
            <Flex flex={1} flexDir="column" overflow="hidden">
                {/* Topbar sticky */}
                <TopBar onMenuToggle={() => setIsMobileMenuOpen(true)} />

                {/* Content body scrollable */}
                <Box
                    as="main"
                    flex={1}
                    overflowY="auto"
                    p={{ base: 4, md: 8 }}
                    css={{
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': { background: '#D1C9BA', borderRadius: '10px' },
                    }}
                >
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
};

export default DashboardLayout;
