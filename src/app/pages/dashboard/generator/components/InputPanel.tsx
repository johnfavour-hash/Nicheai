import {
    VStack,
    Box,
    Text,
    Textarea,
    Button,
    Heading,
    SimpleGrid,
    HStack,
    chakra
} from "@chakra-ui/react";
import { Wand2, Target } from "lucide-react";
import { useState } from "react";

interface InputPanelProps {
    onGenerate: (topic: string, tone: string) => void;
    isGenerating: boolean;
    platform: string;
    setPlatform: (val: string) => void;
}

const InputPanel = ({ onGenerate, isGenerating, platform, setPlatform }: InputPanelProps) => {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("professional");

    const tones = [
        { label: "Professional", value: "professional" },
        { label: "Witty", value: "witty" },
        { label: "Educational", value: "educational" },
        { label: "Inspirational", value: "inspirational" },
        { label: "Action-oriented", value: "action-oriented" },
    ];

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
                <Box p={2} bg="bronze.50" borderRadius="lg" color="bronze.500">
                    <Target size={16} />
                </Box>
                <Heading fontSize="lg" color="bark.500">Content Strategy</Heading>
            </HStack>

            <Box>
                <Text fontSize="xs" fontWeight="bold" color="bark.200" mb={2} textTransform="uppercase" letterSpacing="wider">
                    Target Platform
                </Text>
                <SimpleGrid columns={3} gap={3}>
                    {["instagram", "tiktok", "twitter"].map((p) => (
                        <Button
                            key={p}
                            size="sm"
                            variant={platform === p ? "solid" : "outline"}
                            bg={platform === p ? "bronze.500" : "transparent"}
                            color={platform === p ? "white" : "bark.300"}
                            borderColor={platform === p ? "bronze.500" : "cream.300"}
                            _hover={{ bg: platform === p ? "bronze.600" : "cream.100" }}
                            onClick={() => setPlatform(p)}
                            textTransform="capitalize"
                        >
                            {p}
                        </Button>
                    ))}
                </SimpleGrid>
            </Box>

            <Box>
                <Text fontSize="xs" fontWeight="bold" color="bark.200" mb={2} textTransform="uppercase" letterSpacing="wider">
                    Topic or Niche
                </Text>
                <Textarea
                    placeholder="e.g. AI-powered marketing trends for 2026..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    bg="cream.50"
                    border="none"
                    _focus={{ bg: "white", outline: "2px solid {colors.bronze.500}" }}
                    minH="120px"
                    fontSize="sm"
                />
            </Box>

            <Box>
                <chakra.label htmlFor="tone-select" fontSize="xs" fontWeight="bold" color="bark.200" mb={2} textTransform="uppercase" letterSpacing="wider" display="block">
                    Tone of Voice
                </chakra.label>
                <select
                    id="tone-select"
                    value={tone}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTone(e.target.value)}
                    aria-label="Tone of Voice"
                    title="Tone of Voice"
                    className="tone-select"
                >
                    {tones.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </select>
            </Box>

            <Box mt="auto">
                <Button
                    w="full"
                    bg="bark.500"
                    color="white"
                    size="lg"
                    borderRadius="xl"
                    gap={2}
                    onClick={() => onGenerate(topic, tone)}
                    loading={isGenerating}
                    _hover={{ bg: "bark.600" }}
                >
                    <Wand2 size={18} />
                    Generate Content
                </Button>
                <Text fontSize="xs" color="bark.200" textAlign="center" mt={3}>
                    Credits remaining: <Text as="span" color="goldenrod.500" fontWeight="bold">24</Text>
                </Text>
            </Box>
        </VStack>
    );
};

export default InputPanel;
