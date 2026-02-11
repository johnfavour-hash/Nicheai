import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    HStack,
    VStack,
    Icon,
    Progress,
    Button,
    Flex,
    Badge,
    Avatar,
    Spinner,
    Center
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "@configs/supabase";
import {
    TrendingUp,
    Users,
    Video,
    Share2,
    Sparkles,
    Clock,
    Play,
    Edit3,
    Copy,
    Calendar
} from "lucide-react";
import { useNavigate } from "react-router";
import { VideoEditorModal, RepurposeModal, PublishModal } from "@components/shared/modals";
import { toaster } from "@components/ui/toaster";

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    trend: "up" | "down";
    trendValue: string | number;
    color: string;
}

const StatCard = ({ icon, label, value, trend, trendValue, color }: StatCardProps) => (
    <Box
        p={6}
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
        borderWidth={1}
        borderColor="cream.200"
        _hover={{ transform: "translateY(-4px)", boxShadow: "md", borderColor: "bronze.200" }}
        transition="all 0.3s"
    >
        <HStack justify="space-between" mb={4}>
            <Box p={2} bg={`${color}.50`} borderRadius="lg" color={`${color}.600`}>
                <Icon as={icon} boxSize={4} />
            </Box>
            <Badge variant="subtle" colorPalette={trend === "up" ? "green" : "red"}>
                {trend === "up" ? "+" : "-"}{trendValue}%
            </Badge>
        </HStack>
        <Text fontSize="xs" color="bark.200" fontWeight="medium" mb={1}>{label}</Text>
        <Heading fontSize="xl" color="bark.500">{value}</Heading>
    </Box>
);

const DashboardPage = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [isVideoEditorOpen, setIsVideoEditorOpen] = useState(false);
    const [isRepurposeOpen, setIsRepurposeOpen] = useState(false);
    const [isPublishOpen, setIsPublishOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="bronze.500" />
            </Center>
        );
    }

    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Artist";
    const avatarUrl = user?.user_metadata?.avatar_url;

    return (
        <Box>
            {/* Header Area */}
            <Flex justify="space-between" align={{ base: "start", md: "end" }} mb={10} flexDir={{ base: "column", md: "row" }} gap={{ base: 6, md: 0 }}>
                <HStack gap={4}>
                    <Avatar.Root size="lg">
                        <Avatar.Image src={avatarUrl} alt={displayName} />
                        <Avatar.Fallback name={displayName} />
                    </Avatar.Root>
                    <Box>
                        <Heading fontSize={{ base: "xl", md: "2xl" }} color="bark.500" mb={1}>
                            Welcome back, {displayName}
                        </Heading>
                        <Text color="bark.200" fontSize="sm">
                            Here's what's happening with your content today.
                        </Text>
                    </Box>
                </HStack>
                <HStack gap={4} w={{ base: "full", md: "auto" }}>
                    <Button variant="outline" borderColor="cream.400" color="bark.400" px={6} flex={{ base: 1, md: "initial" }}>
                        View Reports
                    </Button>
                    <Button
                        bg="bronze.500"
                        color="white"
                        px={8}
                        _hover={{ bg: "bronze.600" }}
                        onClick={() => navigate('/dashboard/generator')}
                        flex={{ base: 1, md: "initial" }}
                    >
                        New Project
                    </Button>
                </HStack>
            </Flex>

            {/* Quick Stats */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={10}>
                <StatCard
                    icon={TrendingUp}
                    label="Reach"
                    value="1.2M"
                    trend="up"
                    trendValue="12"
                    color="bronze"
                />
                <StatCard
                    icon={Users}
                    label="Subscribers"
                    value="42.5K"
                    trend="up"
                    trendValue="8"
                    color="seaweed"
                />
                <StatCard
                    icon={Video}
                    label="Video Views"
                    value="856K"
                    trend="up"
                    trendValue="24"
                    color="goldenrod"
                />
                <StatCard
                    icon={Share2}
                    label="Engagement"
                    value="12.4%"
                    trend="down"
                    trendValue="2"
                    color="blue"
                />
            </SimpleGrid>

            {/* Main Content Grid */}
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
                {/* Active Projects */}
                <Box gridColumn={{ lg: "span 2" }}>
                    <HStack justify="space-between" mb={6}>
                        <Heading fontSize="lg" color="bark.500">Active Projects</Heading>
                        <Button variant="ghost" size="sm" color="bronze.500">View all</Button>
                    </HStack>

                    <VStack gap={4} align="stretch">
                        {[1, 2, 3].map((i) => (
                            <Box
                                key={i}
                                p={5}
                                bg="white"
                                borderRadius="2xl"
                                borderWidth={1}
                                borderColor="cream.200"
                                _hover={{ borderColor: "bronze.300" }}
                                transition="all 0.2s"
                            >
                                <HStack gap={6} align="center" flexDir={{ base: "column", md: "row" }}>
                                    <Box
                                        w={{ base: "full", md: 20 }}
                                        h={12}
                                        bg="cream.200"
                                        borderRadius="lg"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        overflow="hidden"
                                    >
                                        <Icon as={Play} boxSize={4} color="bronze.500" fill="currentColor" />
                                    </Box>
                                    <Box flex={1} w="full">
                                        <Text fontWeight="bold" color="bark.500" mb={1}>
                                            {i === 1 ? "AI Marketing Campaign" : i === 2 ? "Product Launch Video" : "Social Media Blast"}
                                        </Text>
                                        <HStack gap={4} flexWrap="wrap">
                                            <HStack gap={1}>
                                                <Icon as={Clock} boxSize={3.5} color="bark.200" />
                                                <Text fontSize="xs" color="bark.200">2 hours ago</Text>
                                            </HStack>
                                            <HStack gap={1}>
                                                <Icon as={Sparkles} boxSize={3.5} color="goldenrod.500" />
                                                <Text fontSize="xs" color="bark.200">High Priority</Text>
                                            </HStack>
                                        </HStack>
                                    </Box>
                                    <Box w={{ base: "full", md: "120px" }}>
                                        <HStack justify="space-between" mb={1}>
                                            <Text fontSize="xs" color="bark.200" fontWeight="bold">Progress</Text>
                                            <Text fontSize="xs" color="bronze.500" fontWeight="bold">{i * 30}%</Text>
                                        </HStack>
                                        <Progress.Root value={i * 30} size="xs" colorPalette="bronze">
                                            <Progress.Track bg="cream.200">
                                                <Progress.Range />
                                            </Progress.Track>
                                        </Progress.Root>
                                    </Box>
                                    <HStack gap={2} display={{ base: "flex", md: "flex" }} w={{ base: "full", md: "auto" }} justify={{ base: "space-around", md: "initial" }}>
                                        <Button variant="ghost" size="sm" color="bark.200" minW={10} p={0} onClick={() => setIsVideoEditorOpen(true)}>
                                            <Edit3 size={18} />
                                        </Button>
                                        <Button variant="ghost" size="sm" color="bark.200" minW={10} p={0} onClick={() => setIsRepurposeOpen(true)}>
                                            <Copy size={18} />
                                        </Button>
                                        <Button variant="ghost" size="sm" color="bark.200" minW={10} p={0} onClick={() => setIsPublishOpen(true)}>
                                            <Calendar size={18} />
                                        </Button>
                                    </HStack>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>
                </Box>

                {/* Right Sidebar Inside Dashboard */}
                <Box>
                    <Heading fontSize="lg" color="bark.500" mb={6}>AI Insights</Heading>
                    <Box bg="bark.500" p={6} borderRadius="xl" color="white" mb={6}>
                        <VStack align="start" gap={4}>
                            <Box p={2} bg="whiteAlpha.200" borderRadius="lg">
                                <Icon as={Sparkles} boxSize={4} color="goldenrod.400" />
                            </Box>
                            <Box>
                                <Text fontWeight="bold" fontSize="lg" mb={2}>Strategic Tip</Text>
                                <Text fontSize="sm" color="whiteAlpha.800" lineHeight="relaxed">
                                    Your "AI Tutorial" videos are trending. Creating 3 more this week could boost
                                    reach by 15% based on current velocity.
                                </Text>
                            </Box>
                            <Button
                                w="full"
                                bg="goldenrod.500"
                                color="bark.500"
                                fontWeight="bold"
                                size="md"
                                onClick={() => navigate('/dashboard/generator')}
                            >
                                Generate Ideas
                            </Button>
                        </VStack>
                    </Box>

                    <Box bg="white" p={6} borderRadius="2xl" borderWidth={1} borderColor="cream.200">
                        <Heading fontSize="md" color="bark.500" mb={4}>Upcoming Trends</Heading>
                        <VStack align="stretch" gap={4}>
                            {["Cyberpunk Aesthetic", "Minimalist Motion", "ASMR Editing"].map((trend, i) => (
                                <HStack key={i} justify="space-between">
                                    <Text fontSize="sm" color="bark.400" fontWeight="medium">#{trend}</Text>
                                    <Badge colorPalette="green" variant="outline">Rising</Badge>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                </Box>
            </SimpleGrid>

            <VideoEditorModal
                isOpen={isVideoEditorOpen}
                onClose={() => setIsVideoEditorOpen(false)}
                onSave={() => {
                    toaster.create({ title: "Video saved successfully!", type: "success" });
                    setIsVideoEditorOpen(false);
                }}
            />
            <RepurposeModal
                isOpen={isRepurposeOpen}
                onClose={() => setIsRepurposeOpen(false)}
                onRepurpose={(platform) => {
                    toaster.create({ title: `Repurposing for ${platform}...`, type: "info" });
                    setIsRepurposeOpen(false);
                }}
            />
            <PublishModal
                isOpen={isPublishOpen}
                onClose={() => setIsPublishOpen(false)}
                content={{
                    id: 'draft',
                    type: 'image',
                    title: 'Draft Post',
                    caption: 'Draft content for scheduling',
                    platforms: ['instagram']
                }}
            />
        </Box>
    );
};

export default DashboardPage;