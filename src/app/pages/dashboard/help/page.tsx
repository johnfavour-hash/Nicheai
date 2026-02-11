import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Icon,
    Button,
    SimpleGrid,
    Input,
    Separator,
    Center,
    Badge,
} from "@chakra-ui/react";
import {
    Search,
    Book,
    Video,
    MessageCircle,
    ExternalLink,
    Zap,
    PlayCircle,
    FileText,
    LifeBuoy
} from "lucide-react";

export const HelpCenter = () => {
    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8} maxW="1000px" mx="auto">
                {/* Search Header */}
                <VStack gap={6} py={10} textAlign="center">
                    <Box p={3} bg="bronze.50" borderRadius="full" color="bronze.500">
                        <LifeBuoy size={40} />
                    </Box>
                    <VStack gap={2}>
                        <Heading fontSize="4xl" color="bark.500" fontWeight="black">
                            How can we help?
                        </Heading>
                        <Text color="bark.300">
                            Search our AI knowledge base or browse popular topics.
                        </Text>
                    </VStack>
                    <Box w="full" maxW="600px" position="relative">
                        <Input
                            placeholder="Search tutorials, AI prompts, and docs..."
                            size="xl"
                            bg="white"
                            borderRadius="full"
                            shadow="lg"
                            border="none"
                            pl={12}
                            _focus={{ ring: 2, ringColor: "bronze.300" }}
                        />
                        <Box position="absolute" left={5} top="50%" transform="translateY(-50%)" color="bark.200">
                            <Search size={20} />
                        </Box>
                    </Box>
                </VStack>

                {/* Quick Cards */}
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                    <Box p={6} bg="white" borderRadius="2xl" shadow="sm" borderWidth={1} borderColor="cream.200" cursor="pointer" _hover={{ shadow: "md", borderColor: "bronze.200" }} transition="all 0.2s">
                        <VStack align="start" gap={4}>
                            <Center boxSize="40px" bg="blue.50" color="blue.500" borderRadius="lg">
                                <Book size={20} />
                            </Center>
                            <Box>
                                <Heading fontSize="md" color="bark.500" mb={1}>Documentation</Heading>
                                <Text fontSize="xs" color="bark.200">Full api and feature guide.</Text>
                            </Box>
                        </VStack>
                    </Box>
                    <Box p={6} bg="white" borderRadius="2xl" shadow="sm" borderWidth={1} borderColor="cream.200" cursor="pointer" _hover={{ shadow: "md", borderColor: "bronze.200" }} transition="all 0.2s">
                        <VStack align="start" gap={4}>
                            <Center boxSize="40px" bg="orange.50" color="orange.500" borderRadius="lg">
                                <Video size={20} />
                            </Center>
                            <Box>
                                <Heading fontSize="md" color="bark.500" mb={1}>Video Tutorials</Heading>
                                <Text fontSize="xs" color="bark.200">Watch AI content workflows.</Text>
                            </Box>
                        </VStack>
                    </Box>
                    <Box p={6} bg="white" borderRadius="2xl" shadow="sm" borderWidth={1} borderColor="cream.200" cursor="pointer" _hover={{ shadow: "md", borderColor: "bronze.200" }} transition="all 0.2s">
                        <VStack align="start" gap={4}>
                            <Center boxSize="40px" bg="bronze.50" color="bronze.500" borderRadius="lg">
                                <MessageCircle size={20} />
                            </Center>
                            <Box>
                                <Heading fontSize="md" color="bark.500" mb={1}>AI Academy</Heading>
                                <Text fontSize="xs" color="bark.200">Learn prompt engineering.</Text>
                            </Box>
                        </VStack>
                    </Box>
                </SimpleGrid>

                <Separator />

                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} py={6}>
                    {/* FAQ / Support */}
                    <Box>
                        <Heading fontSize="lg" color="bark.500" mb={6}>Popular Questions</Heading>
                        <VStack align="stretch" gap={4}>
                            {[
                                "How do I connect my TikTok account?",
                                "What is the daily limit for AI generation?",
                                "How can I customize the brand voice?",
                                "Can I export videos in 4K resolution?"
                            ].map((q, i) => (
                                <HStack key={i} p={4} bg="cream.50" borderRadius="xl" justify="space-between" cursor="pointer" _hover={{ bg: "cream.100" }}>
                                    <Text fontSize="sm" fontWeight="medium" color="bark.500">{q}</Text>
                                    <ExternalLink size={14} color="#8D7B68" />
                                </HStack>
                            ))}
                        </VStack>
                    </Box>

                    {/* Featured Resource */}
                    <Box bg="bark.500" borderRadius="3xl" p={8} color="white" position="relative" overflow="hidden">
                        <Icon as={Zap} position="absolute" bottom={-10} right={-10} boxSize="200px" opacity={0.05} />
                        <VStack align="start" gap={6}>
                            <Badge colorPalette="orange" variant="solid">NEW FEATURE</Badge>
                            <Box>
                                <Heading fontSize="2xl" lineHeight="short">Mastering the AI Video Studio</Heading>
                                <Text fontSize="sm" opacity={0.8} mt={2}>
                                    Our latest deep dive into using auto-captions and voice synthesis for maximum engagement.
                                </Text>
                            </Box>
                            <Button bg="bronze.500" color="white" gap={2} px={8}>
                                <PlayCircle size={18} /> Watch Guide
                            </Button>
                        </VStack>
                    </Box>
                </SimpleGrid>

                {/* Footer Support */}
                <Center py={10}>
                    <HStack gap={10} color="bark.200" fontSize="sm">
                        <HStack gap={2} cursor="pointer" _hover={{ color: "bronze.500" }}>
                            <FileText size={16} /> <Text>Terms of Service</Text>
                        </HStack>
                        <HStack gap={2} cursor="pointer" _hover={{ color: "bronze.500" }}>
                            <ShieldCheck size={16} /> <Text>Privacy Policy</Text>
                        </HStack>
                    </HStack>
                </Center>
            </VStack>
        </Box>
    );
};

import { ShieldCheck } from "lucide-react";
export default HelpCenter;
