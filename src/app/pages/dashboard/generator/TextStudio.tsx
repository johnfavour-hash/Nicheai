import {
    Box,
    VStack,
    Heading,
    Text,
    HStack,
    Button,
    Container,
    Flex,
    IconButton,
    Center
} from "@chakra-ui/react";
import {
    Settings,
    Eye,
    ChevronLeft,
    ChevronRight,
    Share2,
    Download,
    ArrowLeft,
    Wand2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import InputPanel from "./components/InputPanel";
import ScriptEditor from "./components/ScriptEditor";
import PreviewSection from "./components/PreviewSection";
import { generateSocialContent } from "@services/gemini.service";
import { toaster } from "@components/ui/toaster";

const TextStudio = () => {
    const navigate = useNavigate();
    const [platform, setPlatform] = useState("instagram");
    const [mode, setMode] = useState("text");
    const [content, setContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    // UI State for "De-congested" experience
    const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

    const handleGenerate = async (topic: string, tone: string) => {
        if (!topic) {
            toaster.create({
                title: "Topic required",
                description: "Please enter a topic to generate content.",
                type: "error"
            });
            return;
        }

        setIsGenerating(true);
        try {
            const aiContent = await generateSocialContent(topic, platform, tone);
            setContent(aiContent);
            toaster.create({
                title: "Script generated!",
                type: "success"
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to connect.";
            toaster.create({
                title: "Generation failed",
                description: message,
                type: "error"
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Flex h="100vh" bgGradient="linear(to-br, cream.50, cream.100)" overflow="hidden" flexDir={{ base: "column", lg: "row" }}>
            {/* LEFT SIDEBAR: Collapsible Tools */}
            <Box
                w={{ base: "full", lg: isLeftPanelOpen ? "340px" : "0px" }}
                h={{ base: isLeftPanelOpen ? "auto" : "0px", lg: "full" }}
                transition="all 0.3s ease"
                bg="whiteAlpha.900"
                backdropFilter="blur(10px)"
                borderRightWidth={{ base: 0, lg: isLeftPanelOpen ? 1 : 0 }}
                borderBottomWidth={{ base: isLeftPanelOpen ? 1 : 0, lg: 0 }}
                borderColor="cream.200"
                position="relative"
                overflow="hidden"
                shadow="xl"
                zIndex={10}
            >
                <Box p={6} w="340px">
                    <HStack justify="space-between" mb={6}>
                        <VStack align="start" gap={0}>
                            <Heading fontSize="xl" color="bark.500">Strategy</Heading>
                            <Text fontSize="xs" color="bark.200">Refine your AI prompt</Text>
                        </VStack>
                        <IconButton
                            aria-label="Collapse"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsLeftPanelOpen(false)}
                        >
                            <ChevronLeft size={18} />
                        </IconButton>
                    </HStack>
                    <InputPanel
                        onGenerate={handleGenerate}
                        isGenerating={isGenerating}
                        platform={platform}
                        setPlatform={setPlatform}
                        mode={mode}
                        setMode={setMode}
                    />
                </Box>
            </Box>

            {/* MAIN CANVAS: The Star of the show */}
            <VStack flex={1} gap={0} align="stretch" position="relative">
                {/* Canvas Header */}
                <HStack p={4} px={{ base: 4, md: 8 }} bg="whiteAlpha.800" backdropFilter="blur(16px)" borderBottomWidth={1} borderColor="whiteAlpha.500" justify="space-between" wrap="wrap" gap={3} zIndex={5} shadow="sm">
                    <HStack gap={{ base: 2, md: 4 }}>
                        <IconButton
                            aria-label="Back to Hub"
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/dashboard/generator")}
                        >
                            <ArrowLeft size={18} />
                        </IconButton>
                        <IconButton
                            aria-label="Toggle Strategy"
                            variant={isLeftPanelOpen ? "solid" : "ghost"}
                            bg={isLeftPanelOpen ? "bronze.50" : "transparent"}
                            color={isLeftPanelOpen ? "bronze.600" : "bark.300"}
                            size="sm"
                            onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                        >
                            <Settings size={18} />
                        </IconButton>
                        <VStack align="start" gap={0} display={{ base: "none", sm: "flex" }}>
                            <Text fontSize="md" fontWeight="bold" color="bark.500">Text Studio</Text>
                            <Text fontSize="xs" color="bark.200">Editing: Untitiled Content</Text>
                        </VStack>
                    </HStack>

                    <HStack gap={2}>
                        <Button variant="outline" size="xs" borderRadius="full" gap={2} px={4} display={{ base: "none", md: "flex" }}>
                            <Share2 size={14} /> Share
                        </Button>
                        <Button bg="bark.500" color="white" size="xs" borderRadius="full" gap={2} px={4}>
                            <Download size={14} /> Export
                        </Button>
                        <IconButton
                            aria-label="Preview"
                            variant={isRightPanelOpen ? "solid" : "ghost"}
                            bg={isRightPanelOpen ? "bronze.50" : "transparent"}
                            color={isRightPanelOpen ? "bronze.600" : "bark.300"}
                            size="sm"
                            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                        >
                            <Eye size={18} />
                        </IconButton>
                    </HStack>
                </HStack>

                {/* THE CANVAS */}
                <Box flex={1} overflowY="auto" p={{ base: 4, md: 12 }} position="relative">
                    <Container maxW="4xl" h="full">
                        {!content && !isGenerating && mode === "text" ? (
                            <Center h="full" flexDir="column" gap={4} py={20}>
                                <VStack gap={4} textAlign="center">
                                    <Box p={6} bg="white" borderRadius="full" shadow="sm">
                                        <Wand2 size={40} color="var(--chakra-colors-bronze-500)" />
                                    </Box>
                                    <VStack gap={1}>
                                        <Heading fontSize="xl" color="bark.500">Ready to Create?</Heading>
                                        <Text color="bark.200" maxW="xs">
                                            Enter a topic in the Strategy panel to generate your first script.
                                        </Text>
                                    </VStack>
                                    <Button
                                        variant="outline"
                                        borderColor="bronze.300"
                                        color="bronze.600"
                                        onClick={() => setIsLeftPanelOpen(true)}
                                        display={{ base: "flex", lg: "none" }}
                                    >
                                        Open Strategy
                                    </Button>
                                </VStack>
                            </Center>
                        ) : (
                            <ScriptEditor
                                content={content}
                                setContent={setContent}
                                isGenerating={isGenerating}
                                mode={mode}
                            />
                        )}
                    </Container>
                </Box>
            </VStack>

            {/* RIGHT SIDEBAR: Live Preview Overlay/Panel */}
            <Box
                w={{ base: "full", lg: isRightPanelOpen ? "400px" : "0px" }}
                h={{ base: isRightPanelOpen ? "auto" : "0px", lg: "full" }}
                transition="all 0.3s ease"
                bg="whiteAlpha.900"
                backdropFilter="blur(10px)"
                borderLeftWidth={{ base: 0, lg: isRightPanelOpen ? 1 : 0 }}
                borderTopWidth={{ base: isRightPanelOpen ? 1 : 0, lg: 0 }}
                borderColor="cream.200"
                overflow="hidden"
                shadow="xl"
                zIndex={10}
            >
                <Box p={6} w="400px">
                    <HStack justify="space-between" mb={6}>
                        <VStack align="start" gap={0}>
                            <Heading fontSize="xl" color="bark.500">Live Preview</Heading>
                            <Text fontSize="xs" color="bark.200">Device mockup</Text>
                        </VStack>
                        <IconButton
                            aria-label="Close Preview"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsRightPanelOpen(false)}
                        >
                            <ChevronRight size={18} />
                        </IconButton>
                    </HStack>
                    <PreviewSection
                        platform={platform}
                        content={content}
                        mode={mode}
                    />
                </Box>
            </Box>
        </Flex>
    );
};

export default TextStudio;
