import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { BookOpen, Camera, Sparkles, TrendingUp } from "lucide-react";

const StrategyPillars = () => {
    const pillars = [
        { id: 1, name: "Educational", icon: BookOpen, color: "blue", count: 12 },
        { id: 2, name: "Behind the Scenes", icon: Camera, color: "purple", count: 8 },
        { id: 3, name: "Viral/Trends", icon: TrendingUp, color: "red", count: 5 },
        { id: 4, name: "Promotional", icon: Sparkles, color: "green", count: 3 },
    ];

    return (
        <Box
            bg="white"
            p={5}
            borderRadius="2xl"
            borderWidth={1}
            borderColor="cream.300"
            h="full"
        >
            <Text fontSize="lg" fontWeight="bold" color="bark.500" mb={4}>Content Pillars</Text>

            <VStack align="stretch" gap={3}>
                {pillars.map((pillar) => (
                    <HStack
                        key={pillar.id}
                        p={3}
                        bg="cream.50"
                        borderRadius="xl"
                        justify="space-between"
                        cursor="pointer"
                        _hover={{ bg: "cream.100" }}
                        transition="all 0.2s"
                    >
                        <HStack gap={3}>
                            <Box
                                p={2}
                                bg={`${pillar.color}.100`}
                                color={`${pillar.color}.600`}
                                borderRadius="lg"
                            >
                                <pillar.icon size={18} />
                            </Box>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold" color="bark.500">{pillar.name}</Text>
                                <Text fontSize="xs" color="bark.300">{pillar.count} posts planned</Text>
                            </Box>
                        </HStack>
                    </HStack>
                ))}
            </VStack>

            <Box mt={6} p={4} bg="bronze.50" borderRadius="xl" borderStyle="dashed" borderWidth={1} borderColor="bronze.200">
                <Text fontSize="xs" color="bronze.600" textAlign="center" fontWeight="medium">
                    + Add New Pillar
                </Text>
            </Box>
        </Box>
    );
};

export default StrategyPillars;
