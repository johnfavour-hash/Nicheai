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
    Separator,
    Center,
    Progress,
} from "@chakra-ui/react";
import {
    BarChart3,
    TrendingUp,
    Users,
    MessageSquare,
    Share2,
    Eye,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles
} from "lucide-react";
import useAppStore from "@stores/app.store";

export const AnalyticsDashboard = () => {
    const { niche, projects } = useAppStore();

    const stats = [
        { label: "Total Reach", value: "24.5k", change: "+12.5%", trendingUp: true, icon: Eye, color: "blue.500" },
        { label: "Engagement", value: "8.2%", change: "+5.1%", trendingUp: true, icon: MessageSquare, color: "bronze.500" },
        { label: "Followers", value: "1,204", change: "-0.4%", trendingUp: false, icon: Users, color: "orange.500" },
        { label: "Shares", value: "892", change: "+24.3%", trendingUp: true, icon: Share2, color: "pink.500" },
    ];

    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8}>
                {/* Header */}
                <HStack justify="space-between" wrap="wrap" gap={4}>
                    <Box>
                        <Heading fontSize="2xl" color="bark.500" fontWeight="black" mb={1}>
                            Performance Insights
                        </Heading>
                        <Text color="bark.300">
                            Real-time data for your <b>{niche}</b> content ecosystem.
                        </Text>
                    </Box>
                    <HStack>
                        <Button variant="outline" borderColor="cream.400" color="bark.400" gap={2}>
                            <Calendar size={18} /> Last 30 Days
                        </Button>
                        <Button bg="bark.500" color="white" gap={2}>
                            Export Report
                        </Button>
                    </HStack>
                </HStack>

                {/* Top Stats */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                    {stats.map((stat, i) => (
                        <Box
                            key={i}
                            p={6}
                            bg="white"
                            borderRadius="2xl"
                            borderWidth={1}
                            borderColor="cream.200"
                            shadow="sm"
                        >
                            <HStack justify="space-between" mb={4}>
                                <Center boxSize="40px" bg={`${stat.color.split('.')[0]}.50`} color={stat.color} borderRadius="lg">
                                    <Icon as={stat.icon} boxSize={4} />
                                </Center>
                                <HStack gap={1} color={stat.trendingUp ? "green.500" : "red.500"}>
                                    <Text fontSize="xs" fontWeight="black">{stat.change}</Text>
                                    <Icon as={stat.trendingUp ? ArrowUpRight : ArrowDownRight} boxSize={3} />
                                </HStack>
                            </HStack>
                            <Text fontSize="xl" fontWeight="black" color="bark.500">{stat.value}</Text>
                            <Text fontSize="xs" color="bark.200" fontWeight="bold">{stat.label.toUpperCase()}</Text>
                        </Box>
                    ))}
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, xl: 3 }} gap={8}>
                    {/* Growth Chart (Mock) */}
                    <Box gridColumn={{ xl: "span 2" }} bg="white" p={8} borderRadius="2xl" borderWidth={1} borderColor="cream.200" shadow="sm">
                        <HStack justify="space-between" mb={8}>
                            <Heading fontSize="lg" color="bark.500">Audience Growth</Heading>
                            <HStack gap={4}>
                                <HStack gap={2}>
                                    <Box boxSize="8px" bg="bronze.500" borderRadius="full" />
                                    <Text fontSize="xs" color="bark.300">Organic</Text>
                                </HStack>
                                <HStack gap={2}>
                                    <Box boxSize="8px" bg="bark.200" borderRadius="full" />
                                    <Text fontSize="xs" color="bark.300">Previous</Text>
                                </HStack>
                            </HStack>
                        </HStack>

                        {/* Custom SVG Mock Chart */}
                        <Box h="200px" w="full" position="relative">
                            <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                                <path
                                    d="M0,180 Q100,160 200,170 T400,120 T600,80 T800,20"
                                    fill="none"
                                    stroke="#C5A059"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M0,180 Q100,160 200,170 T400,120 T600,80 T800,20 L800,200 L0,200 Z"
                                    fill="url(#gradient)"
                                    opacity="0.1"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#C5A059" />
                                        <stop offset="100%" stopColor="#FFF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </Box>

                        <HStack justify="space-between" mt={4} color="bark.200" fontSize="xs" fontWeight="bold">
                            <Text>WEEK 1</Text>
                            <Text>WEEK 2</Text>
                            <Text>WEEK 3</Text>
                            <Text>WEEK 4</Text>
                        </HStack>
                    </Box>

                    {/* Platform Performance */}
                    <VStack align="stretch" gap={6}>
                        <Box bg="bark.500" p={8} borderRadius="2xl" color="white" position="relative" overflow="hidden">
                            <Icon as={BarChart3} position="absolute" top={-10} right={-10} boxSize="150px" opacity={0.05} />
                            <VStack align="start" gap={6}>
                                <Badge colorPalette="orange" variant="solid">TOP PERFORMER</Badge>
                                <Box>
                                    <Heading fontSize="xl">TikTok Hub</Heading>
                                    <Text fontSize="sm" opacity={0.8}>Your short-form content is driving 80% of new traffic.</Text>
                                </Box>
                                <VStack align="stretch" w="full" gap={2}>
                                    <HStack justify="space-between">
                                        <Text fontSize="xs">Growth Goal</Text>
                                        <Text fontSize="xs">75%</Text>
                                    </HStack>
                                    <Progress.Root value={75} colorPalette="orange" size="sm" borderRadius="full">
                                        <Progress.Track bg="whiteAlpha.200">
                                            <Progress.Range />
                                        </Progress.Track>
                                    </Progress.Root>
                                </VStack>
                            </VStack>
                        </Box>

                        <Box bg="white" p={6} borderRadius="2xl" borderWidth={1} borderColor="cream.200" shadow="sm">
                            <HStack mb={6} color="bark.500">
                                <Sparkles size={18} />
                                <Heading fontSize="md">AI Predictive Insights</Heading>
                            </HStack>
                            <VStack align="stretch" gap={4}>
                                <Box p={3} bg="cream.50" borderRadius="xl">
                                    <Text fontSize="xs" fontWeight="bold" color="bark.400">NEXT PEAK TIME</Text>
                                    <Text fontSize="sm" fontWeight="black" color="bronze.600">Tuesday, 6:00 PM EST</Text>
                                </Box>
                                <Box p={3} bg="cream.50" borderRadius="xl">
                                    <Text fontSize="xs" fontWeight="bold" color="bark.400">TRENDING KEYWORD</Text>
                                    <Text fontSize="sm" fontWeight="black" color="blue.600">"Sustainable Kitchen"</Text>
                                </Box>
                            </VStack>
                        </Box>
                    </VStack>
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default AnalyticsDashboard;
