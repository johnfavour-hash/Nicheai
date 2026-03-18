import {
    Box,
    Heading,
    Text,
    Center,
    VStack,
    Icon,
    Button,
    Flex,
    HStack,
    IconButton,
    Container,
    Separator,
    SimpleGrid
} from "@chakra-ui/react";
import {
    Scissors,
    Wand2,
    ChevronLeft,
    ChevronRight,
    Settings,
    Download,
    Share2,
    Play,
    Film,
    History,
    ArrowLeft
} from "lucide-react";
import { VideoEditorModal } from "@components/dashboard/modals/VideoEditorModal";
import { useState } from "react";
import { useNavigate } from "react-router";

const VideoLab = () => {
    const navigate = useNavigate();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

    return (
        <Flex h="100vh" bg="cream.50" overflow="hidden" flexDir={{ base: "column", lg: "row" }}>
            {/* LEFT SIDEBAR: Production Controls */}
            <Box
                w={{ base: "full", lg: isLeftPanelOpen ? "340px" : "0px" }}
                h={{ base: isLeftPanelOpen ? "auto" : "0px", lg: "full" }}
                transition="all 0.3s ease"
                bg="white"
                borderRightWidth={{ base: 0, lg: isLeftPanelOpen ? 1 : 0 }}
                borderBottomWidth={{ base: isLeftPanelOpen ? 1 : 0, lg: 0 }}
                borderColor="cream.300"
                position="relative"
                overflow="hidden"
            >
                <Box p={6} w="340px">
                    <HStack justify="space-between" mb={6}>
                        <VStack align="start" gap={0}>
                            <Heading fontSize="xl" color="bark.500">Production</Heading>
                            <Text fontSize="xs" color="bark.200">Video settings & AI tools</Text>
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

                    <VStack align="stretch" gap={6}>
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="bark.200" mb={3} textTransform="uppercase">AI Enhancements</Text>
                            <VStack align="stretch" gap={2}>
                                {["Auto-Captioning", "AI Voiceover", "Scene Detection", "Visual Polish"].map(tool => (
                                    <Button key={tool} variant="outline" size="sm" justifyContent="start" gap={2} fontSize="11px">
                                        <Wand2 size={14} /> {tool}
                                    </Button>
                                ))}
                            </VStack>
                        </Box>
                        <Separator borderColor="cream.100" />
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="bark.200" mb={3} textTransform="uppercase">Export Format</Text>
                            <SimpleGrid columns={2} gap={2}>
                                {["MP4 (H.264)", "MOV", "WebM", "GIF"].map(fmt => (
                                    <Button key={fmt} variant="ghost" size="xs" fontSize="10px">
                                        {fmt}
                                    </Button>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </VStack>
                </Box>
            </Box>

            {/* MAIN CANVAS: The Video Preview Area */}
            <VStack flex={1} gap={0} align="stretch" position="relative">
                <HStack p={4} px={{ base: 4, md: 8 }} bg="white" borderBottomWidth={1} borderColor="cream.100" justify="space-between" wrap="wrap" gap={3}>
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
                            aria-label="Toggle Controls"
                            variant={isLeftPanelOpen ? "solid" : "ghost"}
                            bg={isLeftPanelOpen ? "bronze.50" : "transparent"}
                            color={isLeftPanelOpen ? "bronze.600" : "bark.300"}
                            size="sm"
                            onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                        >
                            <Settings size={18} />
                        </IconButton>
                        <VStack align="start" gap={0} display={{ base: "none", sm: "flex" }}>
                            <Text fontSize="md" fontWeight="bold" color="bark.500">Video Lab</Text>
                            <Text fontSize="xs" color="bark.200">AI-Powered Production</Text>
                        </VStack>
                    </HStack>

                    <HStack gap={3}>
                        <Button variant="outline" size="xs" borderRadius="full" gap={2} px={4} display={{ base: "none", md: "flex" }}>
                            <Share2 size={14} /> Share
                        </Button>
                        <Button bg="bark.500" color="white" size="xs" borderRadius="full" gap={2} px={4}>
                            <Download size={14} /> Render
                        </Button>
                        <IconButton
                            aria-label="History"
                            variant={isRightPanelOpen ? "solid" : "ghost"}
                            bg={isRightPanelOpen ? "bronze.50" : "transparent"}
                            color={isRightPanelOpen ? "bronze.600" : "bark.300"}
                            size="sm"
                            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                        >
                            <History size={18} />
                        </IconButton>
                    </HStack>
                </HStack>

                <Box flex={1} overflowY="auto" p={{ base: 4, md: 8 }} bg="cream.50">
                    <Container maxW="5xl" h="full">
                        <VStack h="full" gap={6}>
                            <Center
                                w="full"
                                flex={1}
                                bg="black"
                                borderRadius="3xl"
                                shadow="2xl"
                                position="relative"
                                overflow="hidden"
                            >
                                <VStack gap={4} color="whiteAlpha.600">
                                    <Play size={64} />
                                    <Text fontWeight="bold">Video Preview Area</Text>
                                    <Text fontSize="sm">Real-time AI rendering will appear here</Text>
                                </VStack>

                                {/* Floating Editor Trigger */}
                                <Button
                                    position="absolute"
                                    bottom={6}
                                    bg="whiteAlpha.200"
                                    _hover={{ bg: "whiteAlpha.300" }}
                                    color="white"
                                    backdropFilter="blur(10px)"
                                    borderRadius="full"
                                    size="md"
                                    gap={2}
                                    onClick={() => setIsEditorOpen(true)}
                                >
                                    <Scissors size={18} /> Launch AI Editor
                                </Button>
                            </Center>

                            {/* Minimal Timeline Placeholder */}
                            <Box w="full" h="100px" bg="white" borderRadius="2xl" border="1px solid" borderColor="cream.300" p={4}>
                                <HStack h="full" gap={4} opacity={0.3}>
                                    <Icon as={Film} size={24} color="bark.300" />
                                    <Box flex={1} h="4px" bg="cream.200" borderRadius="full" />
                                    <Text fontSize="xs" color="bark.300">00:00 / 00:00</Text>
                                </HStack>
                            </Box>
                        </VStack>
                    </Container>
                </Box>
            </VStack>

            {/* RIGHT SIDEBAR: Media Library/History */}
            <Box
                w={{ base: "full", lg: isRightPanelOpen ? "340px" : "0px" }}
                h={{ base: isRightPanelOpen ? "auto" : "0px", lg: "full" }}
                transition="all 0.3s ease"
                bg="white"
                borderLeftWidth={{ base: 0, lg: isRightPanelOpen ? 1 : 0 }}
                borderTopWidth={{ base: isRightPanelOpen ? 1 : 0, lg: 0 }}
                borderColor="cream.300"
                overflow="hidden"
            >
                <Box p={6} w="340px">
                    <HStack justify="space-between" mb={6}>
                        <VStack align="start" gap={0}>
                            <Heading fontSize="xl" color="bark.500">History</Heading>
                            <Text fontSize="xs" color="bark.200">Recent renders</Text>
                        </VStack>
                        <IconButton
                            aria-label="Close"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsRightPanelOpen(false)}
                        >
                            <ChevronRight size={18} />
                        </IconButton>
                    </HStack>
                    <Center h="300px" border="2px dashed" borderColor="cream.300" borderRadius="xl">
                        <Text color="bark.100" fontSize="xs">No recent videos</Text>
                    </Center>
                </Box>
            </Box>

            <VideoEditorModal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
            />
        </Flex>
    );
};

export default VideoLab;
