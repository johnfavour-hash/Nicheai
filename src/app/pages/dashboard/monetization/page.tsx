import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Button,
    SimpleGrid,
    Badge,
    Textarea,
    Input,
    Center,
    Tabs,
} from "@chakra-ui/react";
import {
    Mail,
    FileUser,
    Sparkles,
    DollarSign,
    TrendingUp,
    Download,
    Plus
} from "lucide-react";
import { useState } from "react";
import { generateSponsorshipPitch } from "@services/gemini.service";
import useAppStore from "@stores/app.store";
import { toaster } from "@components/ui/toaster";

export const MonetizationHub = () => {
    const { niche } = useAppStore();
    const [brandName, setBrandName] = useState("");
    const [metrics, setMetrics] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [generatedPitch, setGeneratedPitch] = useState<{ subject: string; emailBody: string; keySellingPoints: string[] } | null>(null);

    const handleGeneratePitch = async () => {
        if (!brandName || !metrics) {
            toaster.create({
                title: "Missing info",
                description: "Please provide both brand name and your performance metrics.",
                type: "error"
            });
            return;
        }

        setIsLoading(true);
        try {
            const pitch = await generateSponsorshipPitch(brandName, niche, metrics);
            setGeneratedPitch(pitch);
            toaster.create({
                title: "Pitch Generated!",
                description: "Your personalized sponsorship email is ready.",
                type: "success"
            });
        } catch (error) {
            console.error("Pitch Generation Error:", error);
            toaster.create({
                title: "Failed to generate",
                description: "Could not connect to AI services. Please try again.",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8}>
                {/* Header Section */}
                <HStack justify="space-between" wrap="wrap" gap={4}>
                    <Box>
                        <Heading fontSize="2xl" color="bark.500" fontWeight="black" mb={1}>
                            Monetization Hub
                        </Heading>
                        <Text color="bark.300">
                            Professional tools to turn your <b>{niche}</b> content into a business.
                        </Text>
                    </Box>
                    <HStack gap={3}>
                        <Button variant="outline" borderColor="cream.400" color="bark.400" gap={2}>
                            <TrendingUp size={18} /> View Media Kit
                        </Button>
                        <Button bg="bronze.500" color="white" gap={2} _hover={{ bg: "bronze.600" }}>
                            <Plus size={18} /> New Campaign
                        </Button>
                    </HStack>
                </HStack>

                <Tabs.Root defaultValue="pitch" variant="enclosed" colorPalette="bronze">
                    <Tabs.List bg="white" p={1} borderRadius="xl" borderWidth={1} borderColor="cream.200">
                        <Tabs.Trigger value="pitch" gap={2}>
                            <Mail size={16} /> Sponsorship Pitch
                        </Tabs.Trigger>
                        <Tabs.Trigger value="media-kit" gap={2}>
                            <FileUser size={16} /> Media Kit AI
                        </Tabs.Trigger>
                        <Tabs.Trigger value="deals" gap={2}>
                            <DollarSign size={16} /> Deal Tracker
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="pitch" py={6}>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
                            {/* Input Column */}
                            <VStack align="stretch" gap={6} bg="white" p={6} borderRadius="2xl" borderWidth={1} borderColor="cream.200">
                                <Box>
                                    <Heading fontSize="lg" color="bark.500" mb={4}>Draft New Pitch</Heading>
                                    <Text fontSize="sm" color="bark.300" mb={6}>
                                        Enter details about the brand you want to work with and your current performance metrics.
                                    </Text>
                                </Box>

                                <VStack align="stretch" gap={4}>
                                    <Box>
                                        <Text fontSize="xs" fontWeight="bold" color="bark.400" mb={2}>TARGET BRAND NAME</Text>
                                        <Input
                                            placeholder="e.g. Nike, Adobe, Local Coffee Shop"
                                            value={brandName}
                                            onChange={(e) => setBrandName(e.target.value)}
                                            bg="cream.50"
                                            border="none"
                                            _focus={{ ring: 2, ringColor: "bronze.300" }}
                                        />
                                    </Box>

                                    <Box>
                                        <Text fontSize="xs" fontWeight="bold" color="bark.400" mb={2}>YOUR PERFORMANCE METRICS</Text>
                                        <Textarea
                                            placeholder="e.g. 50k followers, 10% engagement rate, 1M monthly reach on TikTok"
                                            value={metrics}
                                            onChange={(e) => setMetrics(e.target.value)}
                                            bg="cream.50"
                                            border="none"
                                            h="120px"
                                            _focus={{ ring: 2, ringColor: "bronze.300" }}
                                        />
                                    </Box>

                                    <Button
                                        bg="bark.500"
                                        color="white"
                                        w="full"
                                        h="50px"
                                        mt={4}
                                        gap={2}
                                        onClick={handleGeneratePitch}
                                        loading={isLoading}
                                        _hover={{ bg: "bark.600" }}
                                    >
                                        <Sparkles size={18} /> Generate Professional Pitch
                                    </Button>
                                </VStack>
                            </VStack>

                            {/* Output Column */}
                            <Box
                                bg="cream.100"
                                borderRadius="2xl"
                                p={8}
                                position="relative"
                                minH="400px"
                                display="flex"
                                flexDirection="column"
                            >
                                {!generatedPitch ? (
                                    <Center flex={1} flexDirection="column" textAlign="center" color="bark.200">
                                        <Box mb={4} opacity={0.2}><Mail size={60} /></Box>
                                        <Text fontWeight="medium">Your generated pitch will appear here.</Text>
                                        <Text fontSize="xs">Use the panel on the left to start.</Text>
                                    </Center>
                                ) : (
                                    <VStack align="stretch" gap={6} h="full">
                                        <HStack justify="space-between">
                                            <Badge colorPalette="bronze" variant="solid">AI GENERATED PITCH</Badge>
                                            <Button size="xs" variant="ghost" color="bronze.500" gap={1}>
                                                <Download size={14} /> Copy Content
                                            </Button>
                                        </HStack>

                                        <Box bg="white" p={5} borderRadius="xl" shadow="sm">
                                            <Text fontSize="xs" fontWeight="bold" color="bark.400" mb={1}>SUBJECT LINE</Text>
                                            <Text fontWeight="bold" color="bark.600">{generatedPitch.subject}</Text>
                                        </Box>

                                        <Box bg="white" p={5} borderRadius="xl" shadow="sm" flex={1} overflowY="auto" maxH="300px">
                                            <Text fontSize="xs" fontWeight="bold" color="bark.400" mb={2}>EMAIL BODY</Text>
                                            <Text fontSize="sm" color="bark.500" whiteSpace="pre-wrap">
                                                {generatedPitch.emailBody}
                                            </Text>
                                        </Box>

                                        <VStack align="stretch" gap={2}>
                                            <Text fontSize="xs" fontWeight="bold" color="bark.400">KEY VALUE PROPOSITIONS</Text>
                                            <HStack gap={2} wrap="wrap">
                                                {generatedPitch.keySellingPoints.map((point, i) => (
                                                    <Badge key={i} variant="subtle" colorPalette="bronze" px={3} py={1} borderRadius="full">
                                                        {point}
                                                    </Badge>
                                                ))}
                                            </HStack>
                                        </VStack>
                                    </VStack>
                                )}
                            </Box>
                        </SimpleGrid>
                    </Tabs.Content>

                    <Tabs.Content value="media-kit" py={6}>
                        <Center py={20} bg="white" borderRadius="2xl" borderWidth={1} borderColor="cream.200">
                            <VStack gap={4}>
                                <Box p={4} bg="goldenrod.50" borderRadius="full" color="goldenrod.500">
                                    <FileUser size={40} />
                                </Box>
                                <Heading fontSize="xl">Media Kit Designer</Heading>
                                <Text color="bark.300" textAlign="center" maxW="400px">
                                    Create a stunning, interactive media kit to share with brands. This feature is coming in the next build.
                                </Text>
                                <Button variant="ghost" color="bronze.500">Enable Early Access</Button>
                            </VStack>
                        </Center>
                    </Tabs.Content>
                </Tabs.Root>
            </VStack>
        </Box>
    );
};

export default MonetizationHub;
