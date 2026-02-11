import {
    Box, Container, Heading, Text, SimpleGrid, VStack,
    Button, List, Badge, Icon, HStack
} from "@chakra-ui/react";
import { Check, Zap, Crown, Building } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@utils/animations";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionSimpleGrid = motion(SimpleGrid);

const plans = [
    {
        name: "Starter",
        price: "0",
        tokens: "1,000 Free Tokens",
        icon: Zap,
        features: ["Standard Gemini Access", "1080p Video Gen", "Basic Content Analytics", "Community Support"],
        featured: false,
    },
    {
        name: "Creator Pro",
        price: "29",
        tokens: "50,000 Tokens / Mo",
        icon: Crown,
        features: ["Priority Gemini 3 Access", "4K Cinematic Video", "AI Voice-over Cloning", "Commercial Usage Rights", "Custom AI Workflows"],
        featured: true,
    },
    {
        name: "Studio",
        price: "99",
        tokens: "250,000 Tokens / Mo",
        icon: Building,
        features: ["Unlimited Team Seats", "API Endpoint Access", "Custom Model Training", "Dedicated Account Manager", "White-label Exports"],
        featured: false,
    },
];

const Pricing = () => {
    const navigate = useNavigate();

    return (
        <Box as="section" id="pricing" py={24} bg="cream.100">
            <Container maxW="7xl" px={6}>
                <MotionVStack
                    textAlign="center"
                    mb={16}
                    gap={4}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <MotionBox variants={fadeInUp}>
                        <Badge colorPalette="orange" variant="outline" px={3} py={1} borderRadius="full">PRICING</Badge>
                    </MotionBox>
                    <MotionBox variants={fadeInUp}>
                        <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} fontWeight="black" color="bark.500" letterSpacing="tighter">
                            Fuel Your Creativity
                        </Heading>
                    </MotionBox>
                    <MotionBox variants={fadeInUp}>
                        <Text color="bark.400" fontSize="lg" maxW="2xl" fontWeight="medium">
                            Simple, token-based pricing. No hidden fees. Just pure AI power.
                        </Text>
                    </MotionBox>
                </MotionVStack>

                <MotionSimpleGrid
                    columns={{ base: 1, lg: 3 }}
                    gap={{ base: 10, lg: 8 }}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {plans.map((plan, idx) => (
                        <MotionBox
                            key={idx}
                            p={{ base: 8, md: 10 }}
                            borderRadius="3xl"
                            bg={plan.featured ? "bronze.500" : "white"}
                            color={plan.featured ? "white" : "bark.500"}
                            boxShadow="xl"
                            position="relative"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                            border="1px solid"
                            borderColor={plan.featured ? "bronze.400" : "white"}
                            variants={fadeInUp}
                        >
                            {plan.featured && (
                                <Badge
                                    position="absolute" top={-4} left="50%" transform="translateX(-50%)"
                                    bg="goldenrod.500" color="bark.500" px={4} py={1} borderRadius="full" fontWeight="bold"
                                    zIndex={1}
                                >
                                    MOST POPULAR
                                </Badge>
                            )}

                            <VStack align="flex-start" gap={6}>
                                <Icon as={plan.icon} boxSize={8} color={plan.featured ? "white" : "bronze.500"} />
                                <Box>
                                    <Text fontSize="xl" fontWeight="bold">{plan.name}</Text>
                                    <HStack align="baseline" gap={1}>
                                        <Text fontSize="4xl" fontWeight="black">${plan.price}</Text>
                                        <Text fontSize="sm" opacity={0.8}>/month</Text>
                                    </HStack>
                                    <Text mt={2} fontWeight="bold" color={plan.featured ? "white" : "bronze.700"}>
                                        {plan.tokens}
                                    </Text>
                                </Box>

                                <List.Root gap={4}>
                                    {plan.features.map((feature, fIdx) => (
                                        <HStack key={fIdx} align="center" gap={3}>
                                            <Icon as={Check} boxSize="16px" color={plan.featured ? "white" : "bronze.500"} />
                                            <Text fontSize="sm" fontWeight="bold">{feature}</Text>
                                        </HStack>
                                    ))}
                                </List.Root>

                                <Button
                                    w="full" h={14} borderRadius="2xl" fontWeight="bold"
                                    bg={plan.featured ? "white" : "bark.500"}
                                    color={plan.featured ? "bronze.500" : "white"}
                                    _hover={{ opacity: 0.9 }}
                                    onClick={() => navigate("/auth/signup")}
                                >
                                    Start with {plan.name === "Starter" ? "Free Tokens" : "Pro Pack"}
                                </Button>
                            </VStack>
                        </MotionBox>
                    ))}
                </MotionSimpleGrid>
            </Container>
        </Box>
    );
};

export default Pricing;

