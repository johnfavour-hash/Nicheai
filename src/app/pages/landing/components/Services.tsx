import { Box, Container, Heading, Text, SimpleGrid, Icon, Badge, VStack } from "@chakra-ui/react";
import { Video, Mic, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@utils/animations";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionSimpleGrid = motion(SimpleGrid);



const services = [
    {
        icon: Video,
        title: "Multimodal Studio",
        desc: "Transform simple prompts into 4K video, studio-grade audio, and viral scripts using Gemini 3 Flash.",
        tokens: "150 Tokens / Gen",
        gridSpan: { base: 1, md: 2 } // Larger card for primary feature
    },
    {
        icon: Mic,
        title: "Director's Booth",
        desc: "Real-time voice brainstorming with your AI Creative Director. Refine hooks and scripts on the fly.",
        tokens: "20 Tokens / Min",
        gridSpan: { base: 1, md: 1 }
    },
    {
        icon: Brain,
        title: "Neural Strategy",
        desc: "Automated 7-day content calendars and competitor reconnaissance powered by deep audience analytics.",
        tokens: "50 Tokens / Plan",
        gridSpan: { base: 1, md: 1 }
    },
    {
        icon: Zap,
        title: "High-Velocity API",
        desc: "Build your own apps on top of NicheAI with our ultra-low latency infrastructure.",
        tokens: "Pay-as-you-go",
        gridSpan: { base: 1, md: 1 }
    }
];

const Services = () => {
    return (
        <Box as="section" id="services" py={24} bg="white">
            <Container maxW="7xl" px={6}>
                <MotionVStack
                    gap={4}
                    align="center"
                    mb={16}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <MotionBox variants={fadeInUp}>
                        <Badge colorPalette="orange" variant="outline" px={3} py={1} borderRadius="full">CAPABILITIES</Badge>
                    </MotionBox>
                    <MotionBox variants={fadeInUp}>
                        <Heading fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="black" color="bark.500" letterSpacing="tighter">AI Infrastructure for Creators</Heading>
                    </MotionBox>
                </MotionVStack>

                <MotionSimpleGrid
                    columns={{ base: 1, md: 2 }}
                    gap={{ base: 6, lg: 10 }}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    {services.map((service, idx) => (
                        <MotionBox
                            key={idx}
                            p={{ base: 8, md: 10 }}
                            borderRadius="4xl"
                            bg="cream.100"
                            border="1px solid"
                            borderColor="cream.300"
                            whileHover={{
                                y: -8,
                                backgroundColor: "white",
                                borderColor: "var(--chakra-colors-bronze-500)",
                                boxShadow: "var(--chakra-shadows-2xl)",
                                transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }
                            }}
                            variants={fadeInUp}
                        >
                            <VStack align="flex-start" gap={8}>
                                <Box
                                    p={4}
                                    borderRadius="2xl"
                                    bg="white"
                                    boxShadow="md"
                                    color="bronze.500"
                                    border="1px solid"
                                    borderColor="cream.200"
                                >
                                    <Icon as={service.icon} boxSize={8} />
                                </Box>
                                <Box>
                                    <Heading fontSize="2xl" mb={4} color="bark.500" letterSpacing="tight">
                                        {service.title}
                                    </Heading>
                                    <Text color="bark.400" fontSize="lg" lineHeight="tall" fontWeight="medium">
                                        {service.desc}
                                    </Text>
                                </Box>
                                <Badge
                                    colorPalette="orange"
                                    variant="subtle"
                                    px={4}
                                    py={1.5}
                                    borderRadius="full"
                                    fontSize="xs"
                                    fontWeight="bold"
                                    letterSpacing="wider"
                                >
                                    {service.tokens}
                                </Badge>
                            </VStack>
                        </MotionBox>
                    ))}
                </MotionSimpleGrid>
            </Container>
        </Box>
    );
};

export default Services;

