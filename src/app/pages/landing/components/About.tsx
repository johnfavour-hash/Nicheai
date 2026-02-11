import { Box, Container, Heading, Text, HStack, VStack, Image, Badge, SimpleGrid, Icon } from "@chakra-ui/react";
import { Sparkles, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@utils/animations";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const About = () => {
    return (
        <Box as="section" id="about" py={24} bg="white" overflow="hidden">
            <Container maxW="7xl" px={6}>
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 16, lg: 20 }} alignItems="center">

                    {/* LEFT: Visual Showcase (Product-First) */}
                    <MotionBox
                        position="relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Box
                            borderRadius="3xl" overflow="hidden" boxShadow="2xl"
                            border="8px solid" borderColor="cream.100" bg="bark.600"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800"
                                alt="AI Generation Interface"
                                filter="grayscale(20%)"
                            />
                            <Box p={6} color="white">
                                <Badge colorPalette="orange" mb={2}>Real-Time Preview</Badge>
                                <Text fontSize="sm" opacity={0.8}>"Cinematic landscape, 8k, cyberpunk aesthetic, bronze lighting..."</Text>
                            </Box>
                        </Box>
                        {/* Floating Trust Card */}
                        <MotionBox
                            position="absolute" bottom="-5" right="-5" p={6} bg="bronze.500"
                            color="white" borderRadius="2xl" boxShadow="xl" display={{ base: "none", md: "block" }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <VStack align="flex-start" gap={1}>
                                <Text fontSize="2xl" fontWeight="black">2.4s</Text>
                                <Text fontSize="xs" fontWeight="bold">GENERATION TIME</Text>
                            </VStack>
                        </MotionBox>
                    </MotionBox>

                    {/* RIGHT: The Vision */}
                    <MotionVStack
                        align="flex-start"
                        gap={8}
                        h="full"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <MotionBox variants={fadeInUp}>
                            <Badge colorPalette="orange" variant="subtle" px={3} py={1} borderRadius="full">THE NICHEAI EDGE</Badge>
                        </MotionBox>
                        <MotionBox variants={fadeInUp}>
                            <Heading
                                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                                fontWeight="black"
                                color="bark.500"
                                letterSpacing="looser"
                                lineHeight="1.2"
                            >
                                The Bridge Between <br />
                                <Text as="span" color="bronze.500">Idea and Reality.</Text>
                            </Heading>
                        </MotionBox>
                        <MotionBox variants={fadeInUp}>
                            <Text fontSize="lg" color="bark.400" fontWeight="medium">
                                NicheAI isn't just another wrapper. We've built a multimodal engine that understands context across text, video, and audio simultaneously.
                            </Text>
                        </MotionBox>

                        <VStack align="flex-start" gap={6} w="full">
                            {[
                                { icon: Sparkles, title: "Zero Latency Engine", text: "Proprietary caching means your content generates in near real-time." },
                                { icon: ShieldCheck, title: "Enterprise-Grade Privacy", text: "Your data stays yours. We never train models on your private prompts." },
                                { icon: Zap, title: "Token Efficiency", text: "Proprietary compression allows you to do more with fewer tokens." }
                            ].map((item, i) => (
                                <MotionBox key={i} variants={fadeInUp} w="full">
                                    <HStack align="flex-start" gap={4}>
                                        <Icon as={item.icon} color="bronze.500" boxSize={6} mt={1} />
                                        <Box>
                                            <Text fontWeight="bold" color="bark.500">{item.title}</Text>
                                            <Text fontSize="sm" color="bark.400">{item.text}</Text>
                                        </Box>
                                    </HStack>
                                </MotionBox>
                            ))}
                        </VStack>
                    </MotionVStack>
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default About;

