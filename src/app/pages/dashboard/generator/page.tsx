import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import InputPanel from "./components/InputPanel";
import ScriptEditor from "./components/ScriptEditor";
import PreviewSection from "./components/PreviewSection";
import { generateSocialContent } from "@services/gemini.service";
import { toaster } from "@components/ui/toaster";

const GeneratorPage = () => {
    const [platform, setPlatform] = useState("instagram");
    const [content, setContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async (topic: string, tone: string) => {
        if (!topic) {
            toaster.create({
                title: "Topic required",
                description: "Please enter a topic or niche to generate content.",
                type: "error"
            });
            return;
        }

        setIsGenerating(true);
        try {
            const aiContent = await generateSocialContent(topic, platform, tone);
            setContent(aiContent);
            toaster.create({
                title: "Content generated!",
                description: "AI has successfully created your post.",
                type: "success"
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to connect to Gemini. Check your API key.";
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
        <Box h={{ base: "auto", xl: "calc(100vh - 100px)" }} overflowY={{ base: "visible", xl: "hidden" }}>
            <Box mb={8} px={1}>
                <Heading fontSize="2xl" color="bark.500" mb={1}>
                    AI Content Generator
                </Heading>
                <Text color="bark.200">
                    Transform your ideas into high-performing social media content.
                </Text>
            </Box>

            <SimpleGrid
                columns={{ base: 1, xl: 3 }}
                gap={8}
                h={{ base: "auto", xl: "calc(100% - 100px)" }}
                pb={{ base: 8, xl: 0 }}
            >
                {/* Step 1: Input Panel */}
                <Box h="full" overflowY={{ base: "visible", xl: "auto" }}>
                    <InputPanel
                        onGenerate={handleGenerate}
                        isGenerating={isGenerating}
                        platform={platform}
                        setPlatform={setPlatform}
                    />
                </Box>

                {/* Step 2: Script Editor */}
                <Box h="full" overflowY={{ base: "visible", xl: "auto" }}>
                    <ScriptEditor
                        content={content}
                        setContent={setContent}
                        isGenerating={isGenerating}
                    />
                </Box>

                {/* Step 3: Preview Panel */}
                <Box h="full" overflowY={{ base: "visible", xl: "auto" }}>
                    <PreviewSection
                        platform={platform}
                        content={content}
                    />
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default GeneratorPage;
