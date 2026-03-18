import {
    Box,
    VStack,
    Text,
    HStack,
    IconButton,
    Container,
    Flex,
    Button
} from "@chakra-ui/react";
import {
    Share2,
    Download,
    ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import PreviewSection from "./components/PreviewSection";

const SocialPreview = () => {
    const navigate = useNavigate();
    const [platform, setPlatform] = useState("instagram");
    const [content] = useState(""); // This would ideally come from a global state or search params
    const [mode, setMode] = useState("text");

    return (
        <Flex h="100vh" bg="cream.50" flexDir="column">
            {/* Header */}
            <HStack p={4} px={8} bg="white" borderBottomWidth={1} borderColor="cream.100" justify="space-between">
                <HStack gap={4}>
                    <IconButton
                        aria-label="Back to Hub"
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate("/dashboard/generator")}
                    >
                        <ArrowLeft size={18} />
                    </IconButton>
                    <VStack align="start" gap={0}>
                        <Text fontSize="md" fontWeight="bold" color="bark.500">Social Preview</Text>
                        <Text fontSize="xs" color="bark.200">Visualize your content across platforms</Text>
                    </VStack>
                </HStack>

                <HStack gap={3}>
                    <Button variant="outline" size="sm" borderRadius="full" gap={2}>
                        <Share2 size={14} /> Send to Mobile
                    </Button>
                    <Button bg="bark.500" color="white" size="sm" borderRadius="full" gap={2}>
                        <Download size={14} /> Download Asset
                    </Button>
                </HStack>
            </HStack>

            {/* Main Content */}
            <Flex flex={1} overflow="hidden">
                {/* Control Panel (Left) */}
                <Box w="340px" bg="white" borderRightWidth={1} borderColor="cream.300" p={6}>
                    <VStack align="stretch" gap={6}>
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="bark.200" mb={3} textTransform="uppercase">Platform Mockup</Text>
                            <VStack align="stretch" gap={2}>
                                {[
                                    { id: "instagram", label: "Instagram Feed", icon: "📸" },
                                    { id: "tiktok", label: "TikTok Video", icon: "🎵" },
                                    { id: "twitter", label: "Twitter X", icon: "🐦" }
                                ].map(p => (
                                    <Button
                                        key={p.id}
                                        variant={platform === p.id ? "solid" : "outline"}
                                        bg={platform === p.id ? "bronze.50" : "transparent"}
                                        borderColor={platform === p.id ? "bronze.200" : "cream.300"}
                                        color={platform === p.id ? "bronze.600" : "bark.500"}
                                        justifyContent="start"
                                        gap={3}
                                        onClick={() => setPlatform(p.id)}
                                    >
                                        <Text fontSize="lg">{p.icon}</Text>
                                        <Text fontSize="sm">{p.label}</Text>
                                    </Button>
                                ))}
                            </VStack>
                        </Box>

                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="bark.200" mb={3} textTransform="uppercase">Content Mode</Text>
                            <Box bg="cream.50" p={1} borderRadius="xl">
                                <HStack gap={1}>
                                    {["text", "image", "video"].map(m => (
                                        <Button
                                            key={m}
                                            flex={1}
                                            size="xs"
                                            variant={mode === m ? "solid" : "ghost"}
                                            bg={mode === m ? "white" : "transparent"}
                                            shadow={mode === m ? "sm" : "none"}
                                            borderRadius="lg"
                                            textTransform="capitalize"
                                            onClick={() => setMode(m)}
                                        >
                                            {m}
                                        </Button>
                                    ))}
                                </HStack>
                            </Box>
                        </Box>
                    </VStack>
                </Box>

                {/* Preview Canvas */}
                <Box flex={1} bg="cream.50" p={12} overflowY="auto">
                    <Container maxW="2xl" centerContent>
                        <PreviewSection
                            platform={platform}
                            content={content}
                            mode={mode}
                        />
                    </Container>
                </Box>
            </Flex>
        </Flex>
    );
};

export default SocialPreview;
