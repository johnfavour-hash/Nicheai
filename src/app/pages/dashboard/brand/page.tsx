import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Button,
    SimpleGrid,
    Input,
    Textarea,
    Separator,
    Center,
    Circle,
} from "@chakra-ui/react";
import {
    Palette,
    Wand2,
    Quote,
    Globe,
    Camera,
    Sparkles,
    Hash,
    Save,
    Type
} from "lucide-react";
import { useState } from "react";
import useAppStore from "@stores/app.store";
import { toaster } from "@components/ui/toaster";
import { rewriteText } from "@services/gemini.service";

export const BrandKitManager = () => {
    const { brandProfile, updateBrandProfile, niche } = useAppStore();
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [localProfile, setLocalProfile] = useState(brandProfile || {
        name: '',
        website: '',
        colors: ['#C05805', '#8B4513', '#D2691E'],
        voice: 'educational',
        bio: ''
    });

    const handleSave = () => {
        updateBrandProfile(localProfile);
        toaster.create({ title: "Brand profile updated!", type: "success" });
    };

    const optimizeBio = async () => {
        if (!localProfile.bio) return;
        setIsOptimizing(true);
        try {
            const optimized = await rewriteText(localProfile.bio, "Professional, magnetic, and niche-optimized for " + niche);
            setLocalProfile(prev => ({ ...prev, bio: optimized }));
            toaster.create({ title: "Bio optimized with AI!", type: "success" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8} maxW="1200px" mx="auto">
                {/* Header */}
                <HStack justify="space-between" wrap="wrap" gap={4}>
                    <Box>
                        <Heading fontSize="2xl" color="bark.500" fontWeight="black" mb={1}>
                            Brand Identity
                        </Heading>
                        <Text color="bark.300">
                            Define your unique voice and visual aesthetic for the <b>{niche}</b> niche.
                        </Text>
                    </Box>
                    <Button bg="bronze.500" color="white" gap={2} onClick={handleSave} size="lg" shadow="lg">
                        <Save size={18} /> Save Brand Kit
                    </Button>
                </HStack>

                <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
                    {/* Left: Visual Identity */}
                    <VStack align="stretch" gap={6}>
                        <Box bg="white" p={6} borderRadius="2xl" borderWidth={1} borderColor="cream.200" shadow="sm">
                            <HStack mb={6} color="bark.500">
                                <Palette size={16} />
                                <Heading fontSize="md">Visual Assets</Heading>
                            </HStack>

                            <VStack align="stretch" gap={6}>
                                <Box>
                                    <Text fontSize="xs" fontWeight="bold" color="bark.300" mb={3}>BRAND COLORS</Text>
                                    <HStack gap={3}>
                                        {localProfile.colors.map((color, i) => (
                                            <Circle key={i} size="40px" bg={color} borderWidth={2} borderColor="cream.100" cursor="pointer" />
                                        ))}
                                        <Circle size="40px" borderStyle="dashed" borderWidth={2} borderColor="cream.300" color="bark.200">
                                            <Plus size={16} />
                                        </Circle>
                                    </HStack>
                                </Box>

                                <Box>
                                    <Text fontSize="xs" fontWeight="bold" color="bark.300" mb={3}>BRAND LOGO</Text>
                                    <Center
                                        w="full"
                                        h="120px"
                                        bg="cream.50"
                                        borderRadius="xl"
                                        borderWidth={2}
                                        borderStyle="dashed"
                                        borderColor="cream.300"
                                        color="bark.200"
                                        flexDirection="column"
                                        gap={2}
                                    >
                                        <Camera size={16} />
                                        <Text fontSize="10px" fontWeight="bold">UPLOAD LOGO</Text>
                                    </Center>
                                </Box>

                                <Box>
                                    <Text fontSize="xs" fontWeight="bold" color="bark.300" mb={3}>TYPOGRAPHY</Text>
                                    <HStack color="bark.500">
                                        <Type size={16} />
                                        <Text fontSize="sm" fontWeight="bold">Inter, Playfair Display</Text>
                                    </HStack>
                                </Box>
                            </VStack>
                        </Box>

                        <Box p={6} bg="bronze.500" borderRadius="2xl" color="white">
                            <VStack align="start" gap={3}>
                                <HStack>
                                    <Sparkles size={16} />
                                    <Text fontSize="xs" fontWeight="bold">AI STYLE GENERATOR</Text>
                                </HStack>
                                <Text fontSize="sm">
                                    Let AI generate a cohesive color palette and logo concepts based on your niche.
                                </Text>
                                <Button size="sm" variant="surface" colorPalette="bronze" w="full">
                                    Generate Visual Style
                                </Button>
                            </VStack>
                        </Box>
                    </VStack>

                    {/* Right: Voice & Messaging */}
                    <VStack align="stretch" gap={6} gridColumn={{ lg: "span 2" }}>
                        <Box bg="white" p={8} borderRadius="2xl" borderWidth={1} borderColor="cream.200" shadow="sm">
                            <VStack align="stretch" gap={8}>
                                <Box>
                                    <HStack justify="space-between" mb={4}>
                                        <HStack color="bark.500">
                                            <Wand2 size={16} />
                                            <Heading fontSize="md">Voice & Messaging</Heading>
                                        </HStack>
                                        <Button size="xs" variant="ghost" color="bronze.500" gap={1} onClick={optimizeBio} loading={isOptimizing}>
                                            <Sparkles size={14} /> AI Bio Refresh
                                        </Button>
                                    </HStack>

                                    <VStack align="stretch" gap={4}>
                                        <Box>
                                            <Text fontSize="xs" fontWeight="bold" color="bark.300" mb={2}>BRAND NAME</Text>
                                            <Input
                                                value={localProfile.name}
                                                onChange={(e) => setLocalProfile(p => ({ ...p, name: e.target.value }))}
                                                bg="cream.50"
                                                border="none"
                                            />
                                        </Box>
                                        <Box>
                                            <Text fontSize="xs" fontWeight="bold" color="bark.300" mb={2}>WEBSITE / PORTFOLIO</Text>
                                            <HStack>
                                                <Input
                                                    value={localProfile.website}
                                                    onChange={(e) => setLocalProfile(p => ({ ...p, website: e.target.value }))}
                                                    bg="cream.50"
                                                    border="none"
                                                    placeholder="https://..."
                                                />
                                                <Button variant="ghost" color="bark.200"><Globe size={18} /></Button>
                                            </HStack>
                                        </Box>
                                        <Box>
                                            <Text fontSize="xs" fontWeight="bold" color="bark.300" mb={2}>NARRATIVE BIO</Text>
                                            <Textarea
                                                value={localProfile.bio}
                                                onChange={(e) => setLocalProfile(p => ({ ...p, bio: e.target.value }))}
                                                bg="cream.50"
                                                border="none"
                                                h="150px"
                                                placeholder="Tell your brand story..."
                                            />
                                        </Box>
                                    </VStack>
                                </Box>

                                <Separator />

                                <Box>
                                    <HStack mb={4} color="bark.500">
                                        <Quote size={16} />
                                        <Heading fontSize="md">Brand Voice Selection</Heading>
                                    </HStack>
                                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                                        {[
                                            { id: 'educational', label: 'Educational', desc: 'Informative & Clear' },
                                            { id: 'humorous', label: 'Witty', desc: 'Funny & Relatable' },
                                            { id: 'premium', label: 'Elite', desc: 'Luxurious & High-end' },
                                        ].map((voice) => (
                                            <Box
                                                key={voice.id}
                                                p={4}
                                                bg={localProfile.voice === voice.id ? "bronze.50" : "cream.50"}
                                                borderRadius="xl"
                                                borderWidth={2}
                                                borderColor={localProfile.voice === voice.id ? "bronze.300" : "transparent"}
                                                cursor="pointer"
                                                onClick={() => setLocalProfile(p => ({ ...p, voice: voice.id }))}
                                            >
                                                <Text fontWeight="bold" fontSize="sm">{voice.label}</Text>
                                                <Text fontSize="10px" color="bark.300">{voice.desc}</Text>
                                            </Box>
                                        ))}
                                    </SimpleGrid>
                                </Box>
                            </VStack>
                        </Box>

                        <Box bg="white" p={6} borderRadius="2xl" borderWidth={1} borderColor="cream.200">
                            <HStack justify="space-between">
                                <HStack gap={4}>
                                    <Center boxSize="40px" bg="bark.50" borderRadius="lg" color="bark.500">
                                        <Hash size={16} />
                                    </Center>
                                    <Box>
                                        <Text fontWeight="bold" fontSize="sm">SEO Signature</Text>
                                        <Text fontSize="xs" color="bark.300">Auto-appended to all posts</Text>
                                    </Box>
                                </HStack>
                                <Button size="sm" variant="outline" borderColor="cream.400">Configure</Button>
                            </HStack>
                        </Box>
                    </VStack>
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

import { Plus } from "lucide-react";
export default BrandKitManager;
