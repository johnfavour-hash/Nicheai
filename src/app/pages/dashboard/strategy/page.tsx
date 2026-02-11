import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Button,
    SimpleGrid,
    Badge,
    Spinner,
    Center,
} from "@chakra-ui/react";
import { Target, TrendingUp, Sparkles, BookOpen, BrainCircuit } from "lucide-react";
import { useState, useEffect } from "react";
import { generateContentStrategy, getAudienceInsights } from "@services/gemini.service";
import useAppStore from "@stores/app.store";
import type { StrategyPost, AudienceInsights as InsightsType } from "@type/index";

export const StrategyPlanner = () => {
    const { niche } = useAppStore();
    const [strategy, setStrategy] = useState<StrategyPost[]>([]);
    const [insights, setInsights] = useState<InsightsType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const generatePlan = async () => {
        setIsLoading(true);
        try {
            const plan = await generateContentStrategy(niche, "Maximum engagement and brand growth");
            const audienceData = await getAudienceInsights(niche);
            setStrategy(plan.week);
            setInsights(audienceData);
        } catch (error) {
            console.error("Strategy Generation Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (niche && strategy.length === 0) {
            generatePlan();
        }
    }, [niche]);

    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8}>
                {/* Header */}
                <HStack justify="space-between">
                    <Box>
                        <Heading fontSize="2xl" color="bark.500" fontWeight="black" mb={1}>
                            Strategy Hub
                        </Heading>
                        <Text color="bark.300">
                            AI-driven content planning for the <b>{niche}</b> niche.
                        </Text>
                    </Box>
                    <Button
                        bg="bronze.500"
                        color="white"
                        gap={2}
                        onClick={generatePlan}
                        loading={isLoading}
                        size="lg"
                        _hover={{ bg: "bronze.600" }}
                    >
                        <BrainCircuit size={18} /> Regenerate Strategy
                    </Button>
                </HStack>

                {isLoading ? (
                    <Center py={20}>
                        <VStack gap={4}>
                            <Spinner size="xl" color="bronze.500" thickness="4px" />
                            <Text fontWeight="bold" color="bark.500">Masterminding your content takeover...</Text>
                        </VStack>
                    </Center>
                ) : (
                    <VStack align="stretch" gap={10}>
                        {/* Insights Section */}
                        {insights && (
                            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                                <Box p={6} bg="white" borderRadius="2xl" borderWidth={1} borderColor="cream.200">
                                    <HStack mb={3} color="bronze.500">
                                        <Target size={16} />
                                        <Text fontWeight="bold" fontSize="sm">AUDIENCE PAIN POINTS</Text>
                                    </HStack>
                                    <VStack align="start" gap={2}>
                                        {insights.painPoints.map((point, i) => (
                                            <HStack key={i} gap={2}>
                                                <Box w={1} h={1} borderRadius="full" bg="bronze.300" />
                                                <Text fontSize="sm" color="bark.400">{point}</Text>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </Box>
                                <Box p={6} bg="white" borderRadius="2xl" borderWidth={1} borderColor="cream.200">
                                    <HStack mb={3} color="blue.500">
                                        <TrendingUp size={16} />
                                        <Text fontWeight="bold" fontSize="sm">CORE ASPIRATIONS</Text>
                                    </HStack>
                                    <VStack align="start" gap={2}>
                                        {insights.aspirations.map((point, i) => (
                                            <HStack key={i} gap={2}>
                                                <Box w={1} h={1} borderRadius="full" bg="blue.300" />
                                                <Text fontSize="sm" color="bark.400">{point}</Text>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </Box>
                                <Box p={6} bg="white" borderRadius="2xl" borderWidth={1} borderColor="cream.200">
                                    <HStack mb={3} color="orange.500">
                                        <Sparkles size={16} />
                                        <Text fontWeight="bold" fontSize="sm">TRENDING HOOKS</Text>
                                    </HStack>
                                    <VStack align="start" gap={2}>
                                        {insights.trendingTopics.map((point, i) => (
                                            <HStack key={i} gap={2}>
                                                <Box w={1} h={1} borderRadius="full" bg="orange.300" />
                                                <Text fontSize="sm" color="bark.400">{point}</Text>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </Box>
                            </SimpleGrid>
                        )}

                        {/* Calendar Grid */}
                        <Box>
                            <Heading fontSize="xl" color="bark.500" mb={6}>7-Day Content Pulse</Heading>
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
                                {strategy.map((item, index) => (
                                    <Box
                                        key={index}
                                        p={5}
                                        bg="white"
                                        borderRadius="2xl"
                                        borderWidth={2}
                                        borderColor="cream.100"
                                        _hover={{ borderColor: "bronze.200", shadow: "md" }}
                                        transition="all 0.2s"
                                    >
                                        <HStack justify="space-between" mb={4}>
                                            <Text fontWeight="black" color="bronze.500" fontSize="xs" letterSpacing="widest">
                                                {item.day.toUpperCase()}
                                            </Text>
                                            <Badge colorPalette="gray" size="sm">{item.platform}</Badge>
                                        </HStack>
                                        <Text fontWeight="bold" color="bark.500" mb={2} fontSize="md">
                                            {item.contentType}
                                        </Text>
                                        <Text fontSize="xs" color="bark.300" mb={4} noOfLines={3}>
                                            {item.reason}
                                        </Text>
                                        <Button size="sm" variant="surface" colorPalette="bronze" w="full" gap={2}>
                                            <BookOpen size={14} /> Draft Post
                                        </Button>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </VStack>
                )}
            </VStack>
        </Box>
    );
};

export default StrategyPlanner;
