import {
    VStack,
    Box,
    Text,
    Textarea,
    Button,
    Heading,
    SimpleGrid,
    HStack
} from "@chakra-ui/react";
import {
    Wand2,
    Target,
    Briefcase,
    Laugh,
    BookOpen,
    Sparkles,
    Zap,
    Type,
    Image as ImageIcon,
    Video
} from "lucide-react";
import { useState } from "react";
import { SegmentedControl } from "../../../../../components/ui/segmented-control";

interface InputPanelProps {
    onGenerate: (topic: string, tone: string) => void;
    isGenerating: boolean;
    platform: string;
    setPlatform: (val: string) => void;
    mode: string;
    setMode: (val: string) => void;
}

const InputPanel = ({
    onGenerate,
    isGenerating,
    platform,
    setPlatform,
    mode,
    setMode
}: InputPanelProps) => {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("professional");

    const tones = [
        { label: "Professional", value: "professional", icon: Briefcase },
        { label: "Witty", value: "witty", icon: Laugh },
        { label: "Educational", value: "educational", icon: BookOpen },
        { label: "Inspirational", value: "inspirational", icon: Sparkles },
        { label: "Action", value: "action-oriented", icon: Zap },
    ];

    return (
        <VStack
            align="stretch"
            gap={6}
            p={6}
            bg="whiteAlpha.900"
            backdropFilter="blur(12px)"
            borderRadius="3xl"
            borderWidth={1}
            borderColor="white"
            h="full"
            shadow="xl"
        >
            <HStack align="center" gap={2} mb={2}>
                <Box p={2} bg="bronze.50" borderRadius="lg" color="bronze.500">
                    <Target size={16} />
                </Box>
                <Heading fontSize="lg" color="bark.500">Content Strategy</Heading>
            </HStack>

            {/* Creation Mode Section */}
            <Box>
                <Text fontSize="xs" fontWeight="semibold" color="bark.200" mb={3} textTransform="uppercase" letterSpacing="wider">
                    Creation Mode
                </Text>
                <SegmentedControl
                    value={mode}
                    onValueChange={(details) => setMode(details.value)}
                    items={[
                        { value: "text", label: <HStack gap={2}><Type size={14} />Script</HStack> },
                        { value: "image", label: <HStack gap={2}><ImageIcon size={14} />Image</HStack> },
                        { value: "video", label: <HStack gap={2}><Video size={14} />Video</HStack> },
                    ]}
                    colorPalette="bronze"
                />
            </Box>

            <Box>
                <Text fontSize="xs" fontWeight="semibold" color="bark.200" mb={3} textTransform="uppercase" letterSpacing="wider">
                    Target Platform
                </Text>
                <SimpleGrid columns={3} gap={3}>
                    {["instagram", "tiktok", "twitter"].map((p) => (
                        <Button
                            key={p}
                            size="sm"
                            variant={platform === p ? "solid" : "outline"}
                            bg={platform === p ? "bronze.500" : "white"}
                            color={platform === p ? "white" : "bark.400"}
                            borderColor={platform === p ? "bronze.500" : "cream.200"}
                            _hover={{ bg: platform === p ? "bronze.600" : "cream.50", transform: "translateY(-1px)" }}
                            onClick={() => setPlatform(p)}
                            textTransform="capitalize"
                            fontSize="xs"
                            shadow={platform === p ? "md" : "sm"}
                            transition="all 0.2s"
                        >
                            {p}
                        </Button>
                    ))}
                </SimpleGrid>
            </Box>

            <Box>
                <Text fontSize="xs" fontWeight="semibold" color="bark.200" mb={2} textTransform="uppercase" letterSpacing="wider">
                    Topic or Niche
                </Text>
                <Textarea
                    placeholder={`e.g. ${mode === 'text' ? 'AI marketing trends...' : mode === 'image' ? 'Futuristic city profile...' : 'Product launch teaser...'}`}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    bg="white"
                    border="1px solid"
                    borderColor="cream.200"
                    _focus={{ bg: "white", borderColor: "bronze.400", boxShadow: "0 0 0 1px var(--chakra-colors-bronze-400)" }}
                    minH="100px"
                    fontSize="sm"
                    shadow="sm"
                    borderRadius="xl"
                    p={4}
                />
            </Box>

            <Box>
                <Text fontSize="xs" fontWeight="semibold" color="bark.200" mb={3} textTransform="uppercase" letterSpacing="wider">
                    Tone of Voice
                </Text>
                <SimpleGrid columns={2} gap={2}>
                    {tones.map((t) => (
                        <Button
                            key={t.value}
                            variant="outline"
                            size="sm"
                            justifyContent="flex-start"
                            gap={2}
                            px={3}
                            borderColor={tone === t.value ? "bronze.500" : "cream.200"}
                            bg={tone === t.value ? "bronze.50" : "white"}
                            color={tone === t.value ? "bronze.700" : "bark.400"}
                            onClick={() => setTone(t.value)}
                            _hover={{ bg: tone === t.value ? "bronze.100" : "cream.50", transform: "translateY(-1px)" }}
                            fontSize="xs"
                            shadow={tone === t.value ? "sm" : "none"}
                            transition="all 0.2s"
                        >
                            <t.icon size={14} />
                            {t.label}
                        </Button>
                    ))}
                </SimpleGrid>
            </Box>

            <Box mt="auto">
                <Button
                    w="full"
                    bgGradient="linear(to-r, bark.500, bark.600)"
                    color="white"
                    size="lg"
                    borderRadius="xl"
                    gap={2}
                    onClick={() => onGenerate(topic, tone)}
                    loading={isGenerating}
                    _hover={{ bg: "bark.600", transform: "scale(1.01)" }}
                    _active={{ transform: "scale(0.98)" }}
                    transition="all 0.2s"
                >
                    <Wand2 size={18} />
                    Generate {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
                <Text fontSize="xs" color="bark.200" textAlign="center" mt={3}>
                    Credits remaining: <Text as="span" color="goldenrod.500" fontWeight="bold">24</Text>
                </Text>
            </Box>
        </VStack>
    );
};

export default InputPanel;

