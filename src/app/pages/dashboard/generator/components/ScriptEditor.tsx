import {
    VStack,
    Box,
    Textarea,
    Button,
    Heading,
    HStack,
    Skeleton,
    Text,
    Center,
    Flex,
    Input
} from "@chakra-ui/react";
import {
    FileText,
    Copy,
    Save,
    Video,
    Layout,
    Image as ImageIcon,
    RefreshCw,
    Wand2
} from "lucide-react";
import { toaster } from "@components/ui/toaster";

interface ScriptEditorProps {
    content: string;
    setContent: (val: string) => void;
    isGenerating: boolean;
    mode: string;
}

const ScriptEditor = ({ content, setContent, isGenerating, mode }: ScriptEditorProps) => {
    const charCount = content?.length || 0;

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        toaster.create({
            title: "Copied to clipboard",
            type: "success",
            duration: 2000
        });
    };

    return (
        <VStack
            align="stretch"
            gap={6}
            p={6}
            p={6}
            bg="whiteAlpha.900"
            backdropFilter="blur(12px)"
            borderRadius="3xl"
            borderWidth={1}
            borderColor="white"
            h="full"
            shadow="xl"
            position="relative"
        >
            <HStack align="center" justify="space-between" mb={2}>
                <HStack gap={2}>
                    <Box p={2} bg="seaweed.50" borderRadius="lg" color="seaweed.600">
                        {mode === "text" && <FileText size={16} />}
                        {mode === "image" && <ImageIcon size={16} />}
                        {mode === "video" && <Video size={16} />}
                    </Box>
                    <Heading fontSize="lg" color="bark.500">
                        {mode === "text" ? "Content Editor" : mode === "image" ? "Image Canvas" : "Video Storyboard"}
                    </Heading>
                </HStack>
                {mode === "text" && (
                    <Text fontSize="xs" fontWeight="semibold" color="bark.200">
                        {charCount} Characters
                    </Text>
                )}
            </HStack>

            <Box flex={1} position="relative">
                {isGenerating ? (
                    <VStack align="stretch" gap={4}>
                        <Skeleton height="20px" width="70%" />
                        <Skeleton height="20px" width="90%" />
                        <Skeleton height="20px" width="80%" />
                        <Skeleton height="120px" width="100%" />
                    </VStack>
                ) : (
                    <>
                        {mode === "text" ? (
                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Your AI-generated content will appear here..."
                                h="full"
                                minH="400px"
                                bg="white"
                                border="1px solid"
                                borderColor="cream.200"
                                p={6}
                                fontSize="md"
                                lineHeight="tall"
                                color="bark.500"
                                _focus={{ borderColor: "seaweed.400", boxShadow: "0 0 0 1px var(--chakra-colors-seaweed-400)" }}
                                borderRadius="xl"
                                shadow="inner"
                                resize="none"
                            />
                        ) : (
                            <Flex
                                h="full"
                                minH="400px"
                                bg="white"
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="cream.200"
                                flexDirection="column"
                                overflow="hidden"
                            >
                                {/* Media Canvas Area */}
                                <Center flex={1} bg="cream.50" borderBottom="1px solid" borderColor="cream.200" flexDirection="column" gap={4}>
                                    {mode === "image" ? (
                                        <ImageIcon size={48} color="var(--chakra-colors-bark-100)" />
                                    ) : (
                                        <Video size={48} color="var(--chakra-colors-bark-100)" />
                                    )}
                                    <Box textAlign="center">
                                        <Text fontWeight="semibold" color="bark.500" mb={1}>
                                            {mode === "image" ? "Visual Asset Preview" : "Video Storyboard"}
                                        </Text>
                                        <Text fontSize="sm" color="bark.200">
                                            {content ? "Prompt generated. Refine below or generate media." : `Enter a prompt below to generate your ${mode}.`}
                                        </Text>
                                    </Box>
                                    {content && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            colorPalette="seaweed"
                                            gap={2}
                                            onClick={() => setContent("")}
                                        >
                                            <RefreshCw size={14} /> Reset Canvas
                                        </Button>
                                    )}
                                </Center>

                                {/* Prompt Bar Area */}
                                <Box p={4} bg="white">
                                    <HStack
                                        w="full"
                                        bg="cream.50"
                                        p={1}
                                        borderRadius="2xl"
                                        border="1px solid"
                                        borderColor="cream.200"
                                        _focusWithin={{ borderColor: "bronze.400", bg: "white", shadow: "sm" }}
                                        transition="all 0.2s"
                                    >
                                        <Input
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder={`Describe the ${mode} you want to create...`}
                                            variant="unstyled"
                                            px={4}
                                            py={3}
                                            fontSize="sm"
                                            flex={1}
                                        />
                                        <Button
                                            bgGradient="linear(to-r, bark.500, bark.600)"
                                            color="white"
                                            borderRadius="xl"
                                            size="md"
                                            px={6}
                                            gap={2}
                                            _hover={{ transform: "translateY(-1px)", shadow: "md" }}
                                        >
                                            <Wand2 size={16} /> {content ? "Update" : "Generate"}
                                        </Button>
                                    </HStack>
                                </Box>
                            </Flex>
                        )}
                    </>
                )}
            </Box>

            <HStack gap={4}>
                <Button
                    variant="outline"
                    flex={1}
                    borderColor="cream.400"
                    color="bark.400"
                    gap={2}
                    size="md"
                    onClick={handleCopy}
                    disabled={!content || isGenerating}
                >
                    <Copy size={16} />
                    Copy
                </Button>
                <Button
                    bg="seaweed.500"
                    color="white"
                    flex={2}
                    gap={2}
                    size="md"
                    _hover={{ bg: "seaweed.600" }}
                    disabled={!content || isGenerating}
                >
                    <Save size={16} />
                    Save {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
                <Button
                    variant="ghost"
                    color="bark.200"
                    minW={10}
                    p={0}
                    disabled={isGenerating}
                >
                    <Layout size={18} />
                </Button>
            </HStack>
        </VStack>
    );
};

export default ScriptEditor;

