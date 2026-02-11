import {
    Box, Container, Heading, Text, Button, HStack, VStack,
    Image, Badge
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { Sparkles, Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, float } from "@utils/animations";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const Hero = () => {
    const navigate = useNavigate();
    const glassBg = { base: "whiteAlpha.600", _dark: "blackAlpha.600" };

    return (
        <Box
            as="section"
            position="relative"
            minH="90vh"
            display="flex"
            alignItems="center"
            bg="bark.500" // Your dark brand color
            overflow="hidden"
        >
            {/* Animated Background Glows */}
            <MotionBox
                position="absolute"
                top="-10%"
                right="-10%"
                w="600px"
                h="600px"
                bg="bronze.500"
                filter="blur(150px)"
                opacity={0.15}
                borderRadius="full"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <Container maxW="7xl" px={6} py={20} position="relative" zIndex={10}>
                <HStack gap={16} flexDir={{ base: "column", lg: "row" }} align="center">

                    {/* LEFT: Copy Section */}
                    <MotionVStack
                        align={{ base: "center", lg: "flex-start" }}
                        gap={8}
                        maxW="2xl"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        <MotionBox variants={fadeInUp}>
                            <Badge
                                px={3} py={1} borderRadius="full" colorPalette="orange" variant="subtle"
                                display="flex" alignItems="center" gap={2}
                            >
                                <Sparkles size={14} />
                                <Text fontSize="xs" fontWeight="bold">POWERED BY GEMINI 3.0</Text>
                            </Badge>
                        </MotionBox>

                        <MotionHeading
                            fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                            fontWeight="black"
                            color="white"
                            lineHeight="1.1"
                            textAlign={{ base: "center", lg: "left" }}
                            variants={fadeInUp}
                            letterSpacing="tighter"
                        >
                            One Prompt. <br />
                            <Text as="span" color="bronze.500">Infinite Content.</Text>
                        </MotionHeading>

                        <MotionText
                            fontSize={{ base: "lg", md: "xl" }}
                            color="white"
                            opacity={0.95}
                            textAlign={{ base: "center", lg: "left" }}
                            variants={fadeInUp}
                            maxW={{ base: "80%", md: "full" }}
                            mx={{ base: "auto", lg: "0" }}
                        >
                            Generate 4K Video, Studio Audio, and Viral Copy in seconds.
                            Start for free with 1,000 complimentary tokens.
                        </MotionText>

                        <MotionBox variants={fadeInUp} w="full">
                            <HStack gap={4} flexDir={{ base: "column", sm: "row" }} w="full" justify={{ base: "center", lg: "flex-start" }}>
                                <Button
                                    size="lg" bg="bronze.500" color="white" px={10} h={16} borderRadius="full"
                                    colorPalette="orange"
                                    onClick={() => navigate("/auth/signup")}
                                    _hover={{ transform: "translateY(-2px)", bg: "bronze.600" }}
                                >
                                    <HStack gap={2}>
                                        <Text>Claim 1,000 Free Tokens</Text>
                                        <ArrowRight size={20} />
                                    </HStack>
                                </Button>
                                <Button
                                    size="lg" variant="outline" color="white" px={8} h={16} borderRadius="full"
                                    borderColor="whiteAlpha.300"
                                    _hover={{ bg: "whiteAlpha.100" }}
                                >
                                    <HStack gap={2}>
                                        <Play size={18} fill="white" />
                                        <Text>Watch Demo</Text>
                                    </HStack>
                                </Button>
                            </HStack>
                        </MotionBox>
                    </MotionVStack>

                    {/* RIGHT: Visual Interface Mockup */}
                    <Box
                        flex={1} position="relative" w="full"
                        display={{ base: "none", lg: "block" }}
                    >
                        <MotionBox
                            p={4} borderRadius="3xl" border="1px solid" borderColor="whiteAlpha.200"
                            bg={glassBg} backdropFilter="blur(20px)" boxShadow="2xl"
                            variants={float}
                            animate="animate"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <Box borderRadius="2xl" overflow="hidden" bg="bark.600">
                                <Image
                                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" // High-quality abstract
                                    alt="Multimodal AI Output"
                                    opacity={0.9}
                                />
                                {/* Overlay Micro-UI */}
                                <Box p={6} color="white">
                                    <HStack justify="space-between" mb={4}>
                                        <Text fontSize="sm" fontWeight="bold">NicheAI Generator</Text>
                                        <Badge variant="outline" colorPalette="green">Processing...</Badge>
                                    </HStack>
                                    <Box h="2px" bg="whiteAlpha.200" mb={4} />
                                    <Text fontSize="xs" color="whiteAlpha.600">PROMPT</Text>
                                    <Text fontSize="sm" mt={1}>"Generate a cinematic trailer for a futuristic travel agency..."</Text>
                                </Box>
                            </Box>
                        </MotionBox>
                    </Box>
                </HStack>
            </Container>
        </Box>
    );
};

export default Hero;

