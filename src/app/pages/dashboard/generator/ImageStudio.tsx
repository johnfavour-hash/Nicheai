import {
    Box,
    Heading,
    Text,
    Center,
    VStack,
    HStack,
    IconButton,
    Button,
    Container,
    Flex,
    SimpleGrid
} from "@chakra-ui/react";
import {
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
    Download,
    Share2,
    Eye,
    Settings,
    ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const ImageStudio = () => {
    const navigate = useNavigate();
    const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

    return (
        <Flex h="100vh" bg="cream.50" overflow="hidden" flexDir={{ base: "column", lg: "row" }}>
            {/* LEFT SIDEBAR: Tools */}
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
                            <Heading fontSize="xl" color="bark.500">Visuals</Heading>
                            <Text fontSize="xs" color="bark.200">Image generation tools</Text>
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
                            <Text fontSize="xs" fontWeight="bold" color="bark.200" mb={3} textTransform="uppercase">Style Preset</Text>
                            <SimpleGrid columns={2} gap={2}>
                                {["Photorealistic", "Cinematic", "Digital Art", "3D Render"].map(style => (
                                    <Button key={style} variant="outline" size="sm" fontSize="10px">
                                        {style}
                                    </Button>
                                ))}
                            </SimpleGrid>
                        </Box>
                        <Box>
                            <Text fontSize="xs" fontWeight="bold" color="bark.200" mb={3} textTransform="uppercase">Aspect Ratio</Text>
                            <SimpleGrid columns={3} gap={2}>
                                {["1:1", "16:9", "9:16"].map(ratio => (
                                    <Button key={ratio} variant="outline" size="sm" fontSize="10px">
                                        {ratio}
                                    </Button>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </VStack>
                </Box>
            </Box>

            {/* MAIN CANVAS */}
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
                            aria-label="Toggle Tools"
                            variant={isLeftPanelOpen ? "solid" : "ghost"}
                            bg={isLeftPanelOpen ? "bronze.50" : "transparent"}
                            color={isLeftPanelOpen ? "bronze.600" : "bark.300"}
                            size="sm"
                            onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                        >
                            <Settings size={18} />
                        </IconButton>
                        <VStack align="start" gap={0} display={{ base: "none", sm: "flex" }}>
                            <Text fontSize="md" fontWeight="bold" color="bark.500">Image Studio</Text>
                            <Text fontSize="xs" color="bark.200">Generating visual assets</Text>
                        </VStack>
                    </HStack>

                    <HStack gap={3}>
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

                <Box flex={1} overflowY="auto" p={{ base: 4, md: 12 }} bg="cream.50">
                    <Container maxW="4xl" h="full">
                        <Center
                            w="full"
                            minH="500px"
                            bg="white"
                            borderRadius="3xl"
                            border="1px solid"
                            borderColor="cream.300"
                            shadow="xl"
                        >
                            <VStack gap={6} textAlign="center" p={8}>
                                <Box p={6} bg="cream.50" borderRadius="full">
                                    <ImageIcon size={48} color="var(--chakra-colors-bronze-500)" />
                                </Box>
                                <VStack gap={2}>
                                    <Heading fontSize="xl" color="bark.500">Visual Generation Canvas</Heading>
                                    <Text color="bark.200" fontSize="sm" maxW="xs">
                                        Describe your vision in the prompt bar to generate unique AI imagery.
                                    </Text>
                                </VStack>
                                <Button
                                    variant="outline"
                                    borderColor="bronze.300"
                                    color="bronze.600"
                                    borderRadius="full"
                                    onClick={() => setIsLeftPanelOpen(true)}
                                    display={{ base: "flex", lg: "none" }}
                                >
                                    Open Designer
                                </Button>
                            </VStack>
                        </Center>
                    </Container>
                </Box>
            </VStack>

            {/* RIGHT SIDEBAR: History/Gallery */}
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
                            <Heading fontSize="xl" color="bark.500">Asset Gallery</Heading>
                            <Text fontSize="xs" color="bark.200">Your recent generations</Text>
                        </VStack>
                        <IconButton
                            aria-label="Close Gallery"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsRightPanelOpen(false)}
                        >
                            <ChevronRight size={18} />
                        </IconButton>
                    </HStack>
                    <Center h="300px" border="2px dashed" borderColor="cream.300" borderRadius="xl">
                        <Text color="bark.100" fontSize="xs">No assets generated yet</Text>
                    </Center>
                </Box>
            </Box>
        </Flex>
    );
};

export default ImageStudio;
