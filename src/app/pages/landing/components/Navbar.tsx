import {
    Box, Container, Flex, HStack, Text, Button,
    Link, Icon, IconButton, VStack
} from "@chakra-ui/react";
import { Zap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Mock state for the 2026 "Personalized" UI
    const isLoggedIn = true; // For demonstration of the UI shift
    const tokenBalance = "1,240";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const glassBg = { base: "whiteAlpha.800", _dark: "bark.500" };

    return (
        <Box
            as="header" position="fixed" top={0} left={0} right={0} zIndex={100}
            bg={isScrolled ? glassBg : "transparent"}
            backdropFilter={isScrolled ? "blur(12px)" : "none"}
            borderBottom={isScrolled ? "1px solid" : "none"}
            borderColor="whiteAlpha.200"
            transition="all 0.3s ease"
        >
            <Container maxW="7xl" h={20} display="flex" alignItems="center" px={{ base: 6, lg: 12 }}>
                <Flex justify="space-between" align="center" w="full">
                    <Text
                        fontSize="2xl" fontWeight="black" color={isScrolled ? "bark.500" : "white"}
                        cursor="pointer" onClick={() => navigate("/")}
                    >
                        Niche<Text as="span" color="bronze.500">AI</Text>
                    </Text>

                    <HStack gap={8} display={{ base: "none", lg: "flex" }}>
                        {["Home", "Services", "Pricing"].map((label) => (
                            <Link
                                key={label} href={`#${label.toLowerCase()}`}
                                color={isScrolled ? "bark.500" : "whiteAlpha.800"}
                                fontWeight="bold" fontSize="sm"
                                _hover={{ color: "bronze.500", textDecoration: "none" }}
                            >
                                {label}
                            </Link>
                        ))}

                        {isLoggedIn ? (
                            <HStack
                                gap={3} px={5} py={2}
                                bg="whiteAlpha.100" borderRadius="full"
                                border="1px solid" borderColor="whiteAlpha.200"
                            >
                                <Icon as={Zap} boxSize="14px" color="bronze.500" fill="currentColor" />
                                <Text
                                    fontSize="xs"
                                    fontWeight="black"
                                    color={isScrolled ? "bark.500" : "white"}
                                    letterSpacing="wide"
                                >
                                    {tokenBalance} <Text as="span" opacity={0.6}>TOKENS</Text>
                                </Text>
                            </HStack>
                        ) : (
                            <Button
                                bg="bronze.500" color="white" px={6} borderRadius="full"
                                _hover={{ bg: "bronze.600" }} onClick={() => navigate("/auth/login")}
                            >
                                Get Started
                            </Button>
                        )}
                    </HStack>

                    {/* Mobile Menu Button */}
                    <IconButton
                        display={{ base: "flex", lg: "none" }}
                        variant="ghost"
                        color={isScrolled ? "bark.500" : "white"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Icon as={isMenuOpen ? X : Menu} />
                    </IconButton>
                </Flex>
            </Container>

            {/* Mobile Navigation */}
            <Box
                display={{ base: isMenuOpen ? "block" : "none", lg: "none" }}
                position="absolute"
                top="100%"
                left={0}
                right={0}
                bg="white"
                p={8}
                boxShadow="2xl"
                zIndex={99}
            >
                <VStack gap={6} align="stretch">
                    {["Home", "Services", "Pricing"].map((label) => (
                        <Link
                            key={label}
                            href={`#${label.toLowerCase()}`}
                            color="bark.500"
                            fontWeight="bold"
                            fontSize="lg"
                            onClick={() => setIsMenuOpen(false)}
                            _hover={{ color: "bronze.500" }}
                        >
                            {label}
                        </Link>
                    ))}
                    <Button
                        w="full"
                        bg="bronze.500"
                        color="white"
                        py={6}
                        borderRadius="full"
                        onClick={() => {
                            navigate("/auth/login");
                            setIsMenuOpen(false);
                        }}
                    >
                        Get Started
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default Navbar;
