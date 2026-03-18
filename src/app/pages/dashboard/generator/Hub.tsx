import {
    Box,
    VStack,
    Heading,
    Text,
    HStack,
    Input,
    Button,
    Container,
    SimpleGrid,
    Center,
    Icon
} from "@chakra-ui/react";
import {
    Sparkles,
    Mic,
    Plus,
    ArrowRight,
    Clock,
    History
} from "lucide-react";
import { useNavigate } from "react-router";
import { ServiceCard } from "./ServiceCard";

const GeneratorHub = () => {
    const navigate = useNavigate();

    return (
        <VStack h="100vh" gap={0} bgGradient="linear(to-br, cream.50, cream.100)" overflow="hidden">
            {/* Main Hub Content */}
            <Center flex={1} w="full" px={6}>
                <VStack gap={8} w="full" maxW="2xl" textAlign="center">
                    {/* Gemini-style Header */}
                    <VStack gap={2}>
                        <Heading
                            fontSize={{ base: "3xl", md: "5xl" }}
                            color="bark.500"
                            fontWeight="medium"
                            letterSpacing="tight"
                        >
                            Build your ideas with <Text as="span" color="goldenrod.500">Niche AI</Text>
                        </Heading>
                        <Center>
                            <Box
                                bg="goldenrod.50"
                                p={1}
                                px={3}
                                borderRadius="full"
                                border="1px solid"
                                borderColor="goldenrod.200"
                            >
                                <HStack gap={2}>
                                    <Sparkles size={14} color="var(--chakra-colors-goldenrod-500)" />
                                    <Text fontSize="xs" fontWeight="semibold" color="goldenrod.700">Powered by Gemini 1.5 Pro</Text>
                                </HStack>
                            </Box>
                        </Center>
                    </VStack>

                    {/* Central Search/Prompt Bar */}
                    <Box
                        w="full"
                        bg="whiteAlpha.900"
                        backdropFilter="blur(16px)"
                        p={2}
                        borderRadius="3xl"
                        shadow="2xl"
                        border="1px solid"
                        borderColor="white"
                    >
                        <VStack gap={0} align="stretch">
                            <Input
                                placeholder="Describe your idea or paste a link..."
                                variant="flushed"
                                size="lg"
                                fontSize="md"
                                py={6}
                                px={4}
                                _focus={{ ring: 0 }}
                            />
                            <HStack justify="space-between" p={2}>
                                <HStack gap={2}>
                                    <Button variant="ghost" size="sm" borderRadius="full" color="bark.300">
                                        <Plus size={18} />
                                    </Button>
                                    <Button variant="ghost" size="sm" borderRadius="full" color="bark.300">
                                        <Mic size={18} />
                                    </Button>
                                </HStack>
                                <HStack gap={3}>
                                    <Button
                                        variant="surface"
                                        size="sm"
                                        colorPalette="bronze"
                                        borderRadius="full"
                                        px={4}
                                        _hover={{ transform: "translateY(-1px)", shadow: "sm" }}
                                    >
                                        I'm feeling lucky
                                    </Button>
                                    <Button
                                        bgGradient="linear(to-r, bark.500, bark.600)"
                                        color="white"
                                        size="sm"
                                        borderRadius="full"
                                        px={4}
                                        gap={2}
                                        onClick={() => navigate('text')}
                                        _hover={{ transform: "translateY(-1px)", shadow: "md" }}
                                    >
                                        Build <ArrowRight size={16} />
                                    </Button>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Box>

                    {/* Quick Suggestion */}
                    <Text color="bark.200" fontSize="sm">
                        Try: <Text as="span" fontWeight="medium" cursor="pointer" _hover={{ color: "goldenrod.500" }}>"Create a viral Twitter thread about AI safety..."</Text>
                    </Text>
                </VStack>
            </Center>

            {/* Bento Navigation Footer */}
            <Box w="full" bg="whiteAlpha.800" backdropFilter="blur(12px)" borderTopWidth={1} borderColor="whiteAlpha.500" p={8} shadow="lg" zIndex={10}>
                <Container maxW="6xl">
                    <VStack align="stretch" gap={6} mb={10}>
                        <HStack justify="space-between">
                            <HStack gap={2}>
                                <Icon as={History} boxSize="14px" color="bark.200" />
                                <Text fontSize="xs" fontWeight="semibold" color="bark.200" letterSpacing="widest" textTransform="uppercase">
                                    Continue Creating
                                </Text>
                            </HStack>
                        </HStack>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                            {[
                                { title: "AI Marketing Campaign", time: "2h ago", type: "Video" },
                                { title: "Product Launch Thread", time: "5h ago", type: "Text" },
                            ].map((proj, i) => (
                                <HStack
                                    key={i}
                                    p={4}
                                    bg="white"
                                    borderRadius="2xl"
                                    borderWidth={1}
                                    borderColor="cream.200"
                                    cursor="pointer"
                                    _hover={{ borderColor: "bronze.300", shadow: "md", transform: "translateY(-2px)" }}
                                    transition="all 0.2s"
                                >
                                    <Box p={2} bg="white" borderRadius="lg">
                                        <Clock size={16} color="var(--chakra-colors-bark-200)" />
                                    </Box>
                                    <VStack align="start" gap={0}>
                                        <Text fontSize="sm" fontWeight="semibold" color="bark.500">{proj.title}</Text>
                                        <Text fontSize="10px" color="bark.200">{proj.type} • {proj.time}</Text>
                                    </VStack>
                                </HStack>
                            ))}
                        </SimpleGrid>
                    </VStack>

                    <HStack justify="space-between" mb={6}>
                        <Text fontSize="xs" fontWeight="semibold" color="bark.200" letterSpacing="widest" textTransform="uppercase">
                            Explore Studios
                        </Text>
                        <Button variant="ghost" size="xs" color="goldenrod.500">
                            View App Gallery <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                        </Button>
                    </HStack>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
                        <ServiceCard
                            title="Script Editor"
                            desc="Craft high-performing copy"
                            icon="✍️"
                            path="/dashboard/generator/text"
                        />
                        <ServiceCard
                            title="Image Studio"
                            desc="Generate AI Visuals"
                            icon="🎨"
                            path="/dashboard/generator/image"
                        />
                        <ServiceCard
                            title="Video Lab"
                            desc="Create & Edit AI Clips"
                            icon="🎬"
                            path="/dashboard/generator/video"
                        />
                        <ServiceCard
                            title="Social Preview"
                            desc="Mockup your presence"
                            icon="📱"
                            path="/dashboard/generator/preview"
                        />
                    </SimpleGrid>
                </Container>
            </Box>
        </VStack>
    );
};

export default GeneratorHub;
