import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Link } from "@chakra-ui/react";
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router";

const Footer = () => {
    const navigate = useNavigate();

    const socialLinks = [
        { icon: Facebook, href: "#" },
        { icon: Twitter, href: "#" },
        { icon: Linkedin, href: "#" },
        { icon: Instagram, href: "#" },
    ];

    const quickLinks = [
        "Our Services",
        "Latest Blog",
        "Case Studies",
        "Meet Our Team",
        "Privacy Policy",
    ];

    const services = [
        "Content Generation",
        "Strategic Planning",
        "Growth Analytics",
        "Business Operations",
        "Live Director",
    ];

    return (
        <Box as="footer" bg="bark.500" color="cream.300" pt={20} pb={10}>
            <Container maxW="7xl" px={6}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={12} mb={16}>
                    {/* Brand Info */}
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold" color="white" mb={6}>
                            Niche<Text as="span" color="goldenrod.500">AI</Text>
                        </Text>
                        <Text mb={8} color="white" opacity={0.8} lineHeight="relaxed">
                            The all-in-one AI content studio for creators and agencies. Generate viral
                            content, automate strategies, and dominate any niche with Google Gemini.
                        </Text>
                        <HStack gap={4}>
                            {socialLinks.map((social, idx) => (
                                <Box
                                    key={idx}
                                    w={10}
                                    h={10}
                                    borderRadius="full"
                                    borderWidth={1}
                                    borderColor="bark.400"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    cursor="pointer"
                                    transition="all 0.2s"
                                    _hover={{ bg: "bronze.500", borderColor: "bronze.500" }}
                                >
                                    <social.icon size={18} />
                                </Box>
                            ))}
                        </HStack>
                    </Box>

                    {/* Quick Links */}
                    <Box>
                        <Heading
                            fontSize="lg"
                            fontWeight="bold"
                            color="white"
                            mb={8}
                            pb={2}
                            borderBottomWidth={2}
                            borderColor="goldenrod.500"
                            w="fit-content"
                        >
                            Quick Links
                        </Heading>
                        <VStack align="start" gap={4}>
                            {quickLinks.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    color="white"
                                    opacity={0.8}
                                    _hover={{ color: "goldenrod.500", opacity: 1 }}
                                    transition="all 0.2s"
                                >
                                    {link}
                                </Link>
                            ))}
                        </VStack>
                    </Box>

                    {/* Services */}
                    <Box>
                        <Heading
                            fontSize="lg"
                            fontWeight="bold"
                            color="white"
                            mb={8}
                            pb={2}
                            borderBottomWidth={2}
                            borderColor="goldenrod.500"
                            w="fit-content"
                        >
                            AI Services
                        </Heading>
                        <VStack align="start" gap={4}>
                            {services.map((service, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    color="white"
                                    opacity={0.8}
                                    _hover={{ color: "goldenrod.500", opacity: 1 }}
                                    transition="all 0.2s"
                                >
                                    {service}
                                </Link>
                            ))}
                        </VStack>
                    </Box>

                    {/* Contact Info */}
                    <Box>
                        <Heading
                            fontSize="lg"
                            fontWeight="bold"
                            color="white"
                            mb={8}
                            pb={2}
                            borderBottomWidth={2}
                            borderColor="goldenrod.500"
                            w="fit-content"
                        >
                            Get In Touch
                        </Heading>
                        <VStack align="start" gap={6}>
                            <HStack gap={4}>
                                <Box
                                    w={10}
                                    h={10}
                                    borderRadius="full"
                                    bg="whiteAlpha.100"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexShrink={0}
                                    border="1px solid"
                                    borderColor="whiteAlpha.200"
                                >
                                    <MapPin size={18} color="white" />
                                </Box>
                                <Text fontSize="sm">734, N. Bryan Ave, Chicago, IL 60611</Text>
                            </HStack>
                            <HStack gap={4}>
                                <Box
                                    w={10}
                                    h={10}
                                    borderRadius="full"
                                    bg="whiteAlpha.100"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexShrink={0}
                                    border="1px solid"
                                    borderColor="whiteAlpha.200"
                                >
                                    <Phone size={18} color="white" />
                                </Box>
                                <Text fontSize="sm">+1 (234) 567 890</Text>
                            </HStack>
                            <HStack gap={4}>
                                <Box
                                    w={10}
                                    h={10}
                                    borderRadius="full"
                                    bg="whiteAlpha.100"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexShrink={0}
                                    border="1px solid"
                                    borderColor="whiteAlpha.200"
                                >
                                    <Mail size={18} color="white" />
                                </Box>
                                <Text
                                    fontSize="sm"
                                    cursor="pointer"
                                    _hover={{ color: "goldenrod.500" }}
                                    transition="color 0.2s"
                                >
                                    info@nicheai.com
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                </SimpleGrid>

                {/* Bottom Bar */}
                <Box
                    pt={10}
                    borderTopWidth={1}
                    borderColor="whiteAlpha.100"
                    display="flex"
                    flexDir={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                    fontSize="sm"
                    opacity={0.6}
                >
                    <Text>© 2024 NicheAI. All Rights Reserved.</Text>
                    <HStack gap={8}>
                        <Link href="#" _hover={{ opacity: 1 }}>Terms of Use</Link>
                        <Link href="#" _hover={{ opacity: 1 }}>Cookies</Link>
                        <Text
                            cursor="pointer"
                            _hover={{ color: "goldenrod.500" }}
                            onClick={() => navigate("/auth/login")}
                        >
                            Admin Dashboard
                        </Text>
                    </HStack>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
