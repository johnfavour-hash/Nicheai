import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Icon,
    Button,
    SimpleGrid,
    Badge,
    Center,
} from "@chakra-ui/react";
import {
    DialogRoot,
    DialogContent,
    DialogHeader,
    DialogBody,
    DialogFooter,
    DialogTitle,
    DialogCloseTrigger,
} from "@components/ui/dialog";
import {
    Share2,
    CheckCircle2,
    Lock,
    Rocket,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    Trash2
} from "lucide-react";
import { useState } from "react";
import useAppStore from "@stores/app.store";
import type { GeneratedContent, SocialPlatform } from "@type/index";
import { toaster } from "@components/ui/toaster";

interface PublishModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: GeneratedContent;
}

const PLATFORMS: { id: SocialPlatform; name: string; icon: React.ElementType; color: string }[] = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
    { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: '#000000' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0077B5' },
    { id: 'tiktok', name: 'TikTok', icon: Share2, color: '#000000' },
];

export const PublishModal = ({ isOpen, onClose, content }: PublishModalProps) => {
    const { connectedAccounts } = useAppStore();
    const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const togglePlatform = (p: SocialPlatform) => {
        setSelectedPlatforms(prev =>
            prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
        );
    };

    const handlePublish = () => {
        if (selectedPlatforms.length === 0) {
            toaster.create({ title: "Select a platform", type: "error" });
            return;
        }

        setIsPublishing(true);
        // Simulate multi-platform publishing
        setTimeout(() => {
            setIsPublishing(false);
            setIsComplete(true);
            toaster.create({ title: "Successfully published!", type: "success" });
        }, 2500);
    };

    return (
        <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
            <DialogContent bg="white" borderRadius="3xl" p={2}>
                <DialogHeader borderBottomWidth={1} borderColor="cream.100" pb={6}>
                    <HStack justify="space-between">
                        <HStack gap={3}>
                            <Box p={2} bg="bronze.50" borderRadius="lg" color="bronze.500">
                                <Rocket size={20} />
                            </Box>
                            <DialogTitle fontSize="xl" fontWeight="black" color="bark.500">
                                Finalize & Publish
                            </DialogTitle>
                        </HStack>
                    </HStack>
                </DialogHeader>

                <DialogBody py={8}>
                    {isComplete ? (
                        <Center py={10} flexDirection="column">
                            <Box p={6} bg="green.50" borderRadius="full" color="green.500" mb={6}>
                                <CheckCircle2 size={60} />
                            </Box>
                            <Heading fontSize="2xl" mb={2}>Mission Accomplished!</Heading>
                            <Text color="bark.300" textAlign="center" maxW="400px">
                                Your content has been queued for delivery to {selectedPlatforms.length} platforms.
                            </Text>
                            <Button mt={8} bg="bark.500" color="white" px={10} onClick={onClose}>
                                Done
                            </Button>
                        </Center>
                    ) : (
                        <VStack align="stretch" gap={8}>
                            {/* Content Preview Mini */}
                            <HStack bg="cream.50" p={4} borderRadius="2xl" gap={4}>
                                <Box h="80px" w="80px" bg="cream.50" borderRadius="xl" overflow="hidden" position="relative">
                                    {!content.imageUrl && (
                                        <Center h="full">
                                            <Text color="bark.200" fontSize="sm">No preview</Text>
                                        </Center>
                                    )}
                                    {content.imageUrl && (
                                        <Box
                                            position="absolute"
                                            inset={0}
                                            bgSize="cover"
                                            bgSize="cover"
                                            backgroundPosition="center"
                                            backgroundImage={`url(${content.imageUrl})`}
                                            aria-label={`Preview for ${content.title || "social media asset"}`}
                                        />
                                    )}
                                </Box>
                                <Box flex={1}>
                                    <Text fontWeight="bold" color="bark.500" lineClamp={1}>
                                        {content.title || (content.caption ? (content.caption.slice(0, 30) + "...") : "Social Media Asset")}
                                    </Text>
                                    <Badge colorPalette="bronze" size="xs">AI OPTIMIZED</Badge>
                                </Box>
                            </HStack>

                            {/* Platform Selection */}
                            <Box>
                                <Text fontSize="xs" fontWeight="black" color="bark.400" mb={4}>DESTINATION HUB</Text>
                                <SimpleGrid columns={2} gap={4}>
                                    {connectedAccounts.length === 0 ? (
                                        <Center gridColumn="span 2" py={6} bg="cream.50" borderRadius="xl" flexDirection="column">
                                            <Text fontSize="sm" color="bark.300" mb={3}>No accounts connected yet.</Text>
                                            <Button size="xs" variant="surface" colorPalette="bronze">Go to Integrations</Button>
                                        </Center>
                                    ) : (
                                        connectedAccounts.map((acc) => {
                                            const platform = PLATFORMS.find(p => p.id === acc.platform);
                                            const IconComponent = platform?.icon || Share2;
                                            return (
                                                <HStack
                                                    key={acc.id}
                                                    p={4}
                                                    borderRadius="xl"
                                                    borderWidth={2}
                                                    borderColor={selectedPlatforms.includes(acc.platform) ? "bronze.500" : "cream.100"}
                                                    bg={selectedPlatforms.includes(acc.platform) ? "bronze.50" : "white"}
                                                    cursor="pointer"
                                                    onClick={() => togglePlatform(acc.platform)}
                                                    justify="space-between"
                                                    transition="all 0.2s"
                                                >
                                                    <HStack gap={3}>
                                                        <Icon as={IconComponent} boxSize={5} color="bark.500" />
                                                        <Box>
                                                            <Text fontSize="sm" fontWeight="bold" color="bark.500">{acc.handle}</Text>
                                                            <Text fontSize="10px" color="bark.200">{acc.platform.toUpperCase()}</Text>
                                                        </Box>
                                                    </HStack>
                                                    {selectedPlatforms.includes(acc.platform) && (
                                                        <CheckCircle2 size={16} color="#C5A059" />
                                                    )}
                                                </HStack>
                                            );
                                        })
                                    )}
                                </SimpleGrid>
                            </Box>

                            {/* Privacy / Options */}
                            <HStack bg="orange.50" p={4} borderRadius="xl" gap={3}>
                                <Lock size={20} color="#DD6B20" />
                                <Box>
                                    <Text fontSize="xs" fontWeight="bold" color="orange.700">PRIVATE PUBLISHING</Text>
                                    <Text fontSize="10px" color="orange.600">
                                        Content will be uploaded to your connected accounts as draft/private first for review.
                                    </Text>
                                </Box>
                            </HStack>
                        </VStack>
                    )}
                </DialogBody>

                {!isComplete && (
                    <DialogFooter borderTopWidth={1} borderColor="cream.100" py={6} px={8}>
                        <Button variant="ghost" mr="auto" color="red.500" gap={1}>
                            <Trash2 size={16} /> Delete Asset
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button
                            bg="bronze.500"
                            color="white"
                            px={8}
                            gap={2}
                            onClick={handlePublish}
                            loading={isPublishing}
                            _hover={{ bg: "bronze.600" }}
                        >
                            <Rocket size={18} /> Launch Now
                        </Button>
                    </DialogFooter>
                )}
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
};

export default PublishModal;
