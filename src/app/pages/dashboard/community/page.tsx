import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Icon,
    Button,
    SimpleGrid,
    Badge,
    Spinner,
    Center,
    Avatar,
    IconButton,
} from "@chakra-ui/react";
import {
    Zap,
    AlertTriangle,
    TrendingUp,
    BrainCircuit,
    MoreHorizontal,
    Send
} from "lucide-react";
import { useState, useEffect } from "react";
import { generateEngagementSuggestions } from "@services/gemini.service";
import useAppStore from "@stores/app.store";

export const CommunityManager = () => {
    const { niche } = useAppStore();
    const [suggestions, setSuggestions] = useState<{ questions: string[]; polls: string[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadSuggestions = async () => {
        setIsLoading(true);
        try {
            const data = await generateEngagementSuggestions(niche);
            setSuggestions(data);
        } catch (error) {
            console.error("Engagement Suggestion Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (niche) loadSuggestions();
    }, [niche, loadSuggestions]);

    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8}>
                {/* Header */}
                <HStack justify="space-between" wrap="wrap" gap={4}>
                    <Box>
                        <Heading fontSize="2xl" color="bark.500" fontWeight="black" mb={1}>
                            Community Manager
                        </Heading>
                        <Text color="bark.300">
                            AI-assisted engagement and social pulse for {niche}.
                        </Text>
                    </Box>
                    <Button variant="surface" colorPalette="orange" gap={2} size="lg">
                        <AlertTriangle size={18} /> Crisis Mode: OFF
                    </Button>
                </HStack>

                <SimpleGrid columns={{ base: 1, xl: 3 }} gap={8}>
                    {/* Left: Engagement Suggestions */}
                    <VStack align="stretch" gap={6} gridColumn={{ xl: "span 1" }}>
                        <Box p={6} bg="white" borderRadius="2xl" borderWidth={1} borderColor="cream.200" shadow="sm">
                            <HStack justify="space-between" mb={6}>
                                <HStack gap={2}>
                                    <Box p={2} bg="bronze.50" borderRadius="lg" color="bronze.500">
                                        <BrainCircuit size={16} />
                                    </Box>
                                    <Heading fontSize="lg" color="bark.500">AI Engagement Engine</Heading>
                                </HStack>
                                <Button size="xs" variant="ghost" color="bronze.500" onClick={loadSuggestions} loading={isLoading}>
                                    Refresh
                                </Button>
                            </HStack>

                            {isLoading ? (
                                <Center py={10}>
                                    <Spinner color="bronze.500" />
                                </Center>
                            ) : (
                                <VStack align="stretch" gap={6}>
                                    <Box>
                                        <Text fontSize="xs" fontWeight="bold" color="bark.300" mb={3}>REACH-OUT QUESTIONS</Text>
                                        <VStack align="stretch" gap={3}>
                                            {suggestions?.questions.map((q, i) => (
                                                <Box key={i} p={3} bg="cream.50" borderRadius="lg" position="relative">
                                                    <Text fontSize="sm" color="bark.500">{q}</Text>
                                                    <IconButton
                                                        aria-label="Send"
                                                        size="xs"
                                                        position="absolute"
                                                        right={2}
                                                        bottom={2}
                                                        variant="ghost"
                                                        color="bronze.500"
                                                    >
                                                        <Send size={12} />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </VStack>
                                    </Box>

                                    <Box>
                                        <Text fontSize="xs" fontWeight="bold" color="bark.300" mb={3}>POLL IDEAS</Text>
                                        <VStack align="stretch" gap={3}>
                                            {suggestions?.polls.map((p, i) => (
                                                <Box key={i} p={3} bg="blue.50" borderRadius="lg" borderLeftWidth={4} borderLeftColor="blue.300">
                                                    <Text fontSize="sm" color="bark.500" fontWeight="medium">{p}</Text>
                                                </Box>
                                            ))}
                                        </VStack>
                                    </Box>
                                </VStack>
                            )}
                        </Box>

                        <Box p={6} bg="bark.500" borderRadius="2xl" color="white" position="relative" overflow="hidden">
                            <Icon as={TrendingUp} position="absolute" bottom={-4} right={-4} boxSize={20} opacity={0.1} />
                            <VStack align="start" gap={3}>
                                <Badge colorPalette="orange" variant="solid">SENTIMENT ANALYZER</Badge>
                                <Heading fontSize="md">Overall Mood: Enthusiastic</Heading>
                                <Text fontSize="xs" color="whiteAlpha.800">
                                    Your audience is highly responsive to "Tutorial" style content today. Comments are up 12% vs last week.
                                </Text>
                            </VStack>
                        </Box>
                    </VStack>

                    {/* Right: Mock Feed / Inbox */}
                    <VStack align="stretch" gap={6} gridColumn={{ xl: "span 2" }}>
                        <Box bg="white" p={6} borderRadius="2xl" borderWidth={1} borderColor="cream.200" shadow="sm">
                            <Heading fontSize="lg" color="bark.500" mb={6}>Unified Inbox (Mock)</Heading>

                            <VStack align="stretch" gap={4}>
                                {[
                                    { user: "Sarah J.", platform: "instagram", text: "This vegan lasagna recipe changed my life! Do you have a gluten-free version?", time: "2m ago" },
                                    { user: "TechGeek88", platform: "twitter", text: "Loving the new AI insights. Can you do a deep dive into Gemini 1.5 soon?", time: "15m ago" },
                                    { user: "GreenKitchen", platform: "tiktok", text: "Collab? We're both in the plant-based space!", time: "1h ago" }
                                ].map((msg, i) => (
                                    <Box
                                        key={i}
                                        p={4}
                                        borderRadius="xl"
                                        borderWidth={1}
                                        borderColor="cream.100"
                                        _hover={{ borderColor: "bronze.200", bg: "cream.50" }}
                                        transition="all 0.2s"
                                    >
                                        <HStack justify="space-between" mb={2}>
                                            <HStack gap={3}>
                                                <Avatar.Root size="sm">
                                                    <Avatar.Fallback name={msg.user} />
                                                </Avatar.Root>
                                                <Box>
                                                    <Text fontSize="sm" fontWeight="bold" color="bark.500">{msg.user}</Text>
                                                    <Badge colorPalette="gray" size="xs">{msg.platform}</Badge>
                                                </Box>
                                            </HStack>
                                            <Text fontSize="xs" color="bark.200">{msg.time}</Text>
                                        </HStack>
                                        <Text fontSize="sm" color="bark.400" mb={4}>{msg.text}</Text>
                                        <HStack gap={3}>
                                            <Button size="xs" variant="surface" colorPalette="bronze" gap={1}>
                                                <Zap size={12} /> AI Smart Reply
                                            </Button>
                                            <Button size="xs" variant="ghost" color="bark.300">Dismiss</Button>
                                            <IconButton aria-label="More" size="xs" variant="ghost" ml="auto">
                                                <MoreHorizontal size={14} />
                                            </IconButton>
                                        </HStack>
                                    </Box>
                                ))}
                            </VStack>

                            <Center mt={8} py={4}>
                                <Button variant="ghost" color="bronze.500" fontSize="sm">View all 12 unread messages</Button>
                            </Center>
                        </Box>
                    </VStack>
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default CommunityManager;
