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
    Input,
    Separator,
    Center,
    List,
    Alert,
} from "@chakra-ui/react";
import {
    Search,
    ShieldAlert,
    Target,
    TrendingUp,
    Zap,
    Skull,
    Eye,
    Globe,
    Cpu
} from "lucide-react";
import { useState } from "react";
import { analyzeCompetitor } from "@services/gemini.service";
import useAppStore from "@stores/app.store";
import { toaster } from "@components/ui/toaster";

export const CompetitorScout = () => {
    const { niche } = useAppStore();
    const [competitorUrl, setCompetitorUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!competitorUrl) {
            toaster.create({ title: "URL required", type: "error" });
            return;
        }

        setIsLoading(true);
        try {
            const result = await analyzeCompetitor(competitorUrl);
            setAnalysis(result);
            toaster.create({ title: "Intelligence Captured!", type: "success" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8}>
                {/* Header */}
                <HStack justify="space-between" wrap="wrap" gap={4}>
                    <Box>
                        <Heading fontSize="2xl" color="bark.500" fontWeight="black" mb={1}>
                            Competitor Scout
                        </Heading>
                        <Text color="bark.300">
                            AI-driven intelligence on your rivals in the <b>{niche}</b> space.
                        </Text>
                    </Box>
                    <HStack>
                        <Button variant="ghost" color="bark.300" gap={2}>
                            <Target size={18} /> Market Share
                        </Button>
                    </HStack>
                </HStack>

                <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8}>
                    {/* Input Panel */}
                    <Box
                        gridColumn={{ lg: "span 4" }}
                        bg="white"
                        p={6}
                        borderRadius="2xl"
                        borderWidth={1}
                        borderColor="cream.200"
                        h="fit-content"
                    >
                        <VStack align="stretch" gap={6}>
                            <Box>
                                <Heading fontSize="lg" color="bark.500" mb={4}>Scan Target</Heading>
                                <Text fontSize="sm" color="bark.300" mb={6}>
                                    Paste a social media profile or website URL to analyze their content strategy.
                                </Text>
                            </Box>

                            <VStack align="stretch" gap={4}>
                                <HStack>
                                    <Input
                                        placeholder="https://instagram.com/competitor"
                                        value={competitorUrl}
                                        onChange={(e) => setCompetitorUrl(e.target.value)}
                                        bg="cream.50"
                                        border="none"
                                        _focus={{ ring: 2, ringColor: "bronze.300" }}
                                    />
                                </HStack>
                                <Button
                                    bg="bark.500"
                                    color="white"
                                    onClick={handleAnalyze}
                                    loading={isLoading}
                                    gap={2}
                                >
                                    <Search size={18} /> Deep Intelligence Scan
                                </Button>
                            </VStack>

                            <Separator />

                            <Box>
                                <Text fontSize="xs" fontWeight="bold" color="bark.400" mb={4}>RECENT SCANS</Text>
                                <VStack align="stretch" gap={3}>
                                    {[
                                        { name: "ChefJohn", date: "2h ago", score: "A-" },
                                        { name: "GreenVegan", date: "Yesterday", score: "B+" }
                                    ].map((s, i) => (
                                        <HStack key={i} justify="space-between" p={3} bg="cream.50" borderRadius="xl">
                                            <HStack gap={3}>
                                                <Eye size={14} color="#8D7B68" />
                                                <Text fontSize="xs" fontWeight="bold">{s.name}</Text>
                                            </HStack>
                                            <Badge colorPalette="bronze">{s.score}</Badge>
                                        </HStack>
                                    ))}
                                </VStack>
                            </Box>
                        </VStack>
                    </Box>

                    {/* Intelligence Workspace */}
                    <Box
                        gridColumn={{ lg: "span 8" }}
                        bg="cream.50"
                        borderRadius="2xl"
                        p={8}
                        borderWidth={2}
                        borderStyle="dashed"
                        borderColor="cream.300"
                        position="relative"
                    >
                        {!analysis ? (
                            <Center h="full" flexDirection="column" textAlign="center" color="bark.200" py={20}>
                                <ShieldAlert size={60} opacity={0.3} mb={4} />
                                <Heading fontSize="lg">Intelligence Awaiting Deployment</Heading>
                                <Text fontSize="sm">Perform a scan to reveal competitor weaknesses and content gaps.</Text>
                            </Center>
                        ) : (
                            <VStack align="stretch" gap={6}>
                                <HStack justify="space-between">
                                    <HStack gap={2}>
                                        <Badge colorPalette="red" variant="solid" px={3} py={1}>THREAT LEVEL: HIGH</Badge>
                                        <Badge colorPalette="bronze" variant="surface">AI ANALYSIS COMPLETE</Badge>
                                    </HStack>
                                    <Button size="sm" bg="bronze.500" color="white" gap={2}>
                                        <Zap size={14} /> Counter-Strategy
                                    </Button>
                                </HStack>

                                <Box bg="white" p={8} borderRadius="xl" shadow="md" borderWidth={1} borderColor="cream.200">
                                    <HStack mb={6} color="bark.500">
                                        <Globe size={16} />
                                        <Heading fontSize="md">Strategical Intelligence Report</Heading>
                                    </HStack>
                                    <Text fontSize="sm" color="bark.500" whiteSpace="pre-wrap" lineHeight="tall">
                                        {analysis}
                                    </Text>
                                </Box>

                                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                                    <Box p={4} bg="red.50" borderRadius="xl" borderWidth={1} borderColor="red.100">
                                        <HStack mb={2} color="red.600">
                                            <Skull size={16} />
                                            <Text fontWeight="bold" fontSize="xs">THEIR STRENGTHS</Text>
                                        </HStack>
                                        <Text fontSize="10px" color="bark.400">High engagement on "What I eat in a day" reels.</Text>
                                    </Box>
                                    <Box p={4} bg="green.50" borderRadius="xl" borderWidth={1} borderColor="green.100">
                                        <HStack mb={2} color="green.600">
                                            <Zap size={16} />
                                            <Text fontWeight="bold" fontSize="xs">YOUR OPPORTUNITY</Text>
                                        </HStack>
                                        <Text fontSize="10px" color="bark.400">They lack deep-dive educational long-form content.</Text>
                                    </Box>
                                </SimpleGrid>

                                <HStack bg="bark.500" p={4} borderRadius="xl" color="white" gap={4}>
                                    <Cpu size={16} color="#C5A059" />
                                    <Box flex={1}>
                                        <Text fontSize="xs" fontWeight="black" color="bronze.500">AI COUNTER-MOVE RECOMMENDATION</Text>
                                        <Text fontSize="11px">Focus on "The Science of Vegan Nutrition" to exploit their surface-level content gap.</Text>
                                    </Box>
                                    <Button size="xs" colorPalette="bronze" variant="surface">Deploy Strategy</Button>
                                </HStack>
                            </VStack>
                        )}
                    </Box>
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default CompetitorScout;
