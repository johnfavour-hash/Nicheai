import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Icon,
    Button,
    SimpleGrid,
    Center,
    Spinner,
} from "@chakra-ui/react";
import { Switch } from "../../../../components/ui/switch";
import {
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    Share2,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    Facebook
} from "lucide-react";
import { useState } from "react";
import useAppStore from "@stores/app.store";
import { toaster } from "@components/ui/toaster";
import type { SocialPlatform } from "@type/index";

const PLATFORMS: { id: SocialPlatform; name: string; icon: React.ElementType; color: string }[] = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: '#000000' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0077B5' },
    { id: 'tiktok', name: 'TikTok', icon: Share2, color: '#000000' },
];

export const IntegrationsManager = () => {
    const { connectedAccounts, connectAccount, disconnectAccount } = useAppStore();
    const [isConnecting, setIsConnecting] = useState<string | null>(null);

    const handleToggle = (platform: SocialPlatform) => {
        const existing = connectedAccounts.find(a => a.platform === platform);
        if (existing) {
            disconnectAccount(existing.id);
            toaster.create({ title: `${platform} disconnected`, type: "info" });
        } else {
            setIsConnecting(platform);
            // Simulate OAuth flow
            setTimeout(() => {
                connectAccount({
                    id: Math.random().toString(36).substr(2, 9),
                    platform,
                    handle: `@creativelab_${platform}`
                });
                setIsConnecting(null);
                toaster.create({ title: `${platform} connected!`, type: "success" });
            }, 1500);
        }
    };

    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8} maxW="1000px" mx="auto">
                {/* Header */}
                <VStack align="start" gap={2}>
                    <Heading fontSize="2xl" color="bark.500" fontWeight="black">
                        Integrations
                    </Heading>
                    <Text color="bark.300">
                        Connect your social media accounts to enable AI-powered scheduling and direct publishing.
                    </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {PLATFORMS.map((platform) => {
                        const isConnected = connectedAccounts.some(a => a.platform === platform.id);
                        const account = connectedAccounts.find(a => a.platform === platform.id);

                        return (
                            <Box
                                key={platform.id}
                                p={6}
                                bg="white"
                                borderRadius="2xl"
                                borderWidth={1}
                                borderColor={isConnected ? "bronze.200" : "cream.200"}
                                shadow={isConnected ? "md" : "sm"}
                                transition="all 0.2s"
                            >
                                <HStack justify="space-between">
                                    <HStack gap={4}>
                                        <Center boxSize="50px" bg="cream.50" borderRadius="xl" color={platform.color}>
                                            <Icon as={platform.icon} boxSize={4} />
                                        </Center>
                                        <Box>
                                            <Text fontWeight="bold" color="bark.500">{platform.name}</Text>
                                            {isConnected ? (
                                                <Text fontSize="xs" color="bronze.500" fontWeight="medium">
                                                    {account?.handle}
                                                </Text>
                                            ) : (
                                                <Text fontSize="xs" color="bark.200">Not connected</Text>
                                            )}
                                        </Box>
                                    </HStack>
                                    <VStack align="end" gap={1}>
                                        <Switch
                                            colorPalette="bronze"
                                            checked={isConnected}
                                            onCheckedChange={() => handleToggle(platform.id as SocialPlatform)}
                                            disabled={isConnecting === platform.id}
                                        />
                                        {isConnecting === platform.id && (
                                            <Spinner size="xs" color="bronze.500" />
                                        )}
                                    </VStack>
                                </HStack>

                                {isConnected && (
                                    <Box mt={6} pt={4} borderTopWidth={1} borderColor="cream.100">
                                        <HStack justify="space-between">
                                            <HStack gap={1} color="green.500">
                                                <ShieldCheck size={14} />
                                                <Text fontSize="10px" fontWeight="bold">AUTH VERIFIED</Text>
                                            </HStack>
                                            <Button variant="ghost" size="xs" color="bark.300" gap={1}>
                                                Settings <ArrowRight size={12} />
                                            </Button>
                                        </HStack>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </SimpleGrid>

                {/* Security Info */}
                <Box bg="bark.500" borderRadius="2xl" p={8} color="white" mt={4}>
                    <HStack gap={6} align="start">
                        <Center boxSize="60px" bg="whiteAlpha.100" borderRadius="full">
                            <ShieldCheck size={32} />
                        </Center>
                        <VStack align="start" gap={2} flex={1}>
                            <Heading fontSize="lg">Enterprise-Grade Security</Heading>
                            <Text fontSize="sm" color="whiteAlpha.700">
                                Niche Ai uses official OAuth2 protocols. We never see or store your social media passwords.
                                Permissions are restricted to content publishing and analytics retrieval only.
                            </Text>
                            <HStack mt={2} gap={4}>
                                <HStack gap={1}>
                                    <CheckCircle2 size={14} color="#C5A059" />
                                    <Text fontSize="xs" fontWeight="bold">AES-256 Encryption</Text>
                                </HStack>
                                <HStack gap={1}>
                                    <CheckCircle2 size={14} color="#C5A059" />
                                    <Text fontSize="xs" fontWeight="bold">24/7 Monitoring</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </HStack>
                </Box>
            </VStack>
        </Box>
    );
};

export default IntegrationsManager;
