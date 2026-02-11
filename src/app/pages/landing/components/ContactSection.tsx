import { Box, Container, Heading, Text, SimpleGrid, Input, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const ContactSection = () => {
    const navigate = useNavigate();

    return (
        <Box as="section" id="contact" py={24} bg="white" overflow="hidden">
            <Container maxW="7xl" px={6}>
                <Box
                    borderRadius="3xl"
                    overflow="hidden"
                    display="flex"
                    flexDir={{ base: "column", lg: "row" }}
                    position="relative"
                    bg="bronze.500"
                >
                    {/* Decorative Circle */}
                    <Box
                        position="absolute"
                        top={0}
                        right={0}
                        w={96}
                        h={96}
                        borderRadius="full"
                        transform="translate(50%, -50%)"
                        bg="goldenrod.500"
                        opacity={0.1}
                    />

                    {/* Left Content */}
                    <Box
                        w={{ base: "full", lg: "50%" }}
                        p={{ base: 12, lg: 20 }}
                        color="white"
                        position="relative"
                        zIndex={10}
                    >
                        <Text
                            fontWeight="bold"
                            textTransform="uppercase"
                            letterSpacing="widest"
                            fontSize="xs"
                            mb={8}
                            color="goldenrod.400"
                        >
                            Ready to Transform?
                        </Text>
                        <Heading
                            fontSize={{ base: "3xl", lg: "5xl" }}
                            fontWeight="bold"
                            mb={12}
                            lineHeight="1.2"
                            letterSpacing="looser"
                        >
                            Start Creating Dominating Content Today
                        </Heading>
                        <Text color="white" mb={14} fontSize="lg" opacity={0.9} fontWeight="medium">
                            Join creators and agencies who are already using Niche Content AI Factory
                            to scale their content production and dominate their niches.
                        </Text>
                        <Box display="flex" alignItems="center" gap={8}>
                            <Box
                                w={16}
                                h={16}
                                borderRadius="full"
                                bg="goldenrod.500"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="bark.500"
                                fontWeight="black"
                            >
                                N
                            </Box>
                            <Box>
                                <Heading fontSize="xl" fontWeight="bold">
                                    Niche AI Factory
                                </Heading>
                                <Text color="white" opacity={0.9}>All-in-One Content Studio</Text>
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Form */}
                    <Box
                        w={{ base: "full", lg: "50%" }}
                        bg="whiteAlpha.50"
                        backdropFilter="blur(8px)"
                        p={{ base: 12, lg: 20 }}
                        position="relative"
                        zIndex={10}
                    >
                        <Box as="form" display="flex" flexDir="column" gap={8}>
                            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={8}>
                                <Input
                                    placeholder="Your Name"
                                    bg="whiteAlpha.100"
                                    borderColor="whiteAlpha.200"
                                    borderRadius="lg"
                                    px={6}
                                    py={7}
                                    color="white"
                                    _placeholder={{ color: "whiteAlpha.700" }}
                                    _focus={{ borderColor: "goldenrod.400", boxShadow: "none" }}
                                />
                                <Input
                                    type="email"
                                    placeholder="Email Address"
                                    bg="whiteAlpha.100"
                                    borderColor="whiteAlpha.200"
                                    borderRadius="lg"
                                    px={6}
                                    py={7}
                                    color="white"
                                    _placeholder={{ color: "whiteAlpha.700" }}
                                    _focus={{ borderColor: "goldenrod.400", boxShadow: "none" }}
                                />
                            </SimpleGrid>
                            <Textarea
                                placeholder="How can we help?"
                                rows={4}
                                bg="whiteAlpha.100"
                                borderColor="whiteAlpha.200"
                                borderRadius="lg"
                                px={6}
                                py={4}
                                color="white"
                                _placeholder={{ color: "whiteAlpha.500" }}
                                _focus={{ borderColor: "goldenrod.400", boxShadow: "none" }}
                            />
                            <Button
                                bg="goldenrod.500"
                                color="bark.500"
                                fontWeight="bold"
                                px={10}
                                py={7}
                                mt={4}
                                borderRadius="lg"
                                boxShadow="xl"
                                _hover={{ transform: "translateY(-2px)", opacity: 0.9 }}
                                transition="all 0.2s"
                                w={{ base: "full", sm: "auto" }}
                                onClick={() => navigate("/auth/signup")}
                            >
                                Send Message →
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container >
        </Box >
    );
};

export default ContactSection;
