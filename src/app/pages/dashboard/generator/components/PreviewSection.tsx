import {
    VStack,
    Box,
    Text,
    Heading,
    HStack,
    Center,
    Button
} from "@chakra-ui/react";
import { Eye, Smartphone } from "lucide-react";
import { InstagramPreview } from "@components/previews/InstagramPreview";
import { TikTokPreview } from "@components/previews/TikTokPreview";
import { TwitterPreview } from "@components/previews/TwitterPreview";

interface PreviewSectionProps {
    platform: string;
    content: string;
}

import { VideoEditorModal } from "@components/dashboard/modals/VideoEditorModal";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const PreviewSection = ({ platform, content }: PreviewSectionProps) => {
    const [isRefineOpen, setIsRefineOpen] = useState(false);
    // Generate some mock hashtags if not provided in content
    const hashtags = content.includes("#") ? "" : "#nicheai #ai #trends";

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
            <HStack align="center" justify="space-between" mb={2}>
                <HStack gap={2}>
                    <Box p={2} bg="goldenrod.50" borderRadius="lg" color="goldenrod.600">
                        <Eye size={16} />
                    </Box>
                    <Heading fontSize="lg" color="bark.500">Live Preview</Heading>
                </HStack>

                <Button
                    size="sm"
                    variant="surface"
                    colorPalette="bronze"
                    gap={2}
                    onClick={() => setIsRefineOpen(true)}
                >
                    <Sparkles size={14} /> Refine in Studio
                </Button>
            </HStack>

            <VideoEditorModal
                isOpen={isRefineOpen}
                onClose={() => setIsRefineOpen(false)}
            />

            <Center
                flex={1}
                bg="cream.100"
                borderRadius="xl"
                p={4}
                position="relative"
                overflow="hidden"
            >
                {/* Platform Indicator */}
                <Box
                    position="absolute"
                    top={4}
                    left={4}
                    bg="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    shadow="sm"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    zIndex={1}
                >
                    <Smartphone size={14} color="var(--chakra-colors-goldenrod-500)" />
                    <Text fontSize="xs" fontWeight="bold" color="bark.500" textTransform="uppercase">
                        {platform} View
                    </Text>
                </Box>

                <Box
                    w="full"
                    h="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflowY="auto"
                    css={{
                        '&::-webkit-scrollbar': { width: '4px' },
                        '&::-webkit-scrollbar-thumb': { background: '#F4F2EF' },
                    }}
                >
                    {platform === "instagram" && (
                        <InstagramPreview
                            caption={content || "Your caption will appear here..."}
                            hashtags={hashtags}
                        />
                    )}
                    {platform === "tiktok" && (
                        <TikTokPreview
                            caption={content || "Your video caption will appear here..."}
                            hashtags={hashtags}
                        />
                    )}
                    {platform === "twitter" && (
                        <TwitterPreview
                            text={content || "What's happening?"}
                        />
                    )}
                </Box>
            </Center>

            <Box p={4} bg="goldenrod.50" borderRadius="xl">
                <Text fontSize="xs" color="goldenrod.700" fontWeight="medium">
                    Pro Tip: Add media in the next step to see a full visual preview.
                </Text>
            </Box>
        </VStack>
    );
};

export default PreviewSection;
