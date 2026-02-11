import { Box, Heading, Text, Badge, VStack, HStack, Icon, Button } from "@chakra-ui/react";
import { Sparkles } from "lucide-react";


import { TrendPulse } from "./components/TrendPulse";

const TrendsPage = () => {
    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={10}>
                {/* Header Section */}
                <Box>
                    <Heading fontSize="2xl" color="bark.500" mb={1} fontWeight="black">
                        Viral Newsroom
                    </Heading>
                    <Text color="bark.300" fontSize="lg">
                        Scouting the web for trending topics in your niche.
                    </Text>
                </Box>

                {/* Main Trends Scanner */}
                <TrendPulse />

                {/* AI Predictive Insight */}
                <Box
                    p={8}
                    bg="bark.500"
                    borderRadius="3xl"
                    color="white"
                    position="relative"
                    overflow="hidden"
                    boxShadow="xl"
                >
                    <Icon as={Sparkles} position="absolute" top={-10} right={-10} boxSize={60} opacity={0.1} color="goldenrod.400" />
                    <VStack align="start" gap={4} maxW="700px">
                        <HStack gap={2}>
                            <Badge colorPalette="orange" variant="solid">PREDICTIVE AI</Badge>
                            <Text fontWeight="bold" fontSize="sm">FUTURE TREND ALERT</Text>
                        </HStack>
                        <Heading fontSize="2xl">Algorithm Shift Predicted</Heading>
                        <Text color="whiteAlpha.800" fontSize="md" lineHeight="tall">
                            Global engagement data suggests a massive surge in "Day-in-the-Life" content within your niche over the next weekend.
                            We recommend drafting at least 3 high-authenticity reels now to ride the wave as it peaks.
                        </Text>
                        <Button
                            bg="goldenrod.500"
                            color="bark.500"
                            size="lg"
                            fontWeight="bold"
                            _hover={{ bg: "goldenrod.400", transform: "scale(1.02)" }}
                            transition="all 0.2s"
                        >
                            Generate Scripts for Trend
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
};


export default TrendsPage;
