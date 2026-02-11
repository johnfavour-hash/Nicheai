import { Flex, Box } from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <Flex h="100vh" bg="bg.DEFAULT" overflow="hidden">
            {/* Sidebar Left */}
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            {/* Main Content Area Right */}
            <Flex flex={1} flexDir="column" overflow="hidden">
                {/* Topbar sticky */}
                <TopBar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

                {/* Content body scrollable */}
                <Box
                    as="main"
                    flex={1}
                    overflowY="auto"
                    p={{ base: 4, md: 8 }}
                    css={{
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'var(--chakra-colors-cream-300)',
                            borderRadius: '10px'
                        },
                    }}
                >
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
};

export default DashboardLayout;
