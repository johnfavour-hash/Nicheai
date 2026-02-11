import {
    VStack,
    Box,
    Textarea,
    Button,
    Heading,
    HStack,
    Skeleton
} from "@chakra-ui/react";
import { FileText, Copy, Save, RefreshCw } from "lucide-react";

interface ScriptEditorProps {
    content: string;
    setContent: (val: string) => void;
    isGenerating: boolean;
}

const ScriptEditor = ({ content, setContent, isGenerating }: ScriptEditorProps) => {
    return (
        <VStack
            align="stretch"
            gap={6}
            p={6}
            bg="white"
            borderRadius="2xl"
            borderWidth={1}
            borderColor="cream.300"
            h="full"
            shadow="sm"
        >
            <HStack align="center" gap={2} mb={2}>
                <Box p={2} bg="seaweed.50" borderRadius="lg" color="seaweed.600">
                    <FileText size={16} />
                </Box>
                <Heading fontSize="lg" color="bark.500">Content Editor</Heading>
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
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Your AI-generated content will appear here..."
                        h="full"
                        minH="400px"
                        bg="cream.50"
                        border="none"
                        p={6}
                        fontSize="md"
                        lineHeight="tall"
                        color="bark.400"
                        _focus={{ bg: "white", outline: "2px solid {colors.seaweed.500}" }}
                        resize="none"
                    />
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
                    onClick={() => {
                        navigator.clipboard.writeText(content);
                        // Add toast notification later
                    }}
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
                    Save Workspace
                </Button>
                <Button
                    variant="ghost"
                    color="bark.200"
                    minW={10}
                    p={0}
                    disabled={isGenerating}
                >
                    <RefreshCw size={18} />
                </Button>
            </HStack>
        </VStack>
    );
};

export default ScriptEditor;
