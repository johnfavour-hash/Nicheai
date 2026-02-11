import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Button,
    SimpleGrid,
    Separator,
    Center,
    IconButton,
    Icon,
} from "@chakra-ui/react";
import {
    Folder,
    FileVideo,
    FileImage,
    FileAudio,
    MoreVertical,
    Download,
    Eye,
    Trash2,
    Plus
} from "lucide-react";
import useAppStore from "@stores/app.store";

export const AssetsPage = () => {
    const { niche } = useAppStore();

    const assets = [
        { name: "Promo_Video_V1.mp4", type: "video", size: "12MB", date: "2h ago" },
        { name: "Brand_Logo_Primary.png", type: "image", size: "1.2MB", date: "Yesterday" },
        { name: "Voiceover_Draft.wav", type: "audio", size: "4.5MB", date: "Feb 1" },
        { name: "Script_Engaging_Hook.pdf", type: "doc", size: "45KB", date: "Jan 28" },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'video': return FileVideo;
            case 'image': return FileImage;
            case 'audio': return FileAudio;
            default: return Folder;
        }
    };

    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8}>
                {/* Header */}
                <HStack justify="space-between" wrap="wrap" gap={4}>
                    <Box>
                        <Heading fontSize="2xl" color="bark.500" fontWeight="black" mb={1}>
                            Asset Library
                        </Heading>
                        <Text color="bark.300">
                            Central storage for all your <b>{niche}</b> content assets.
                        </Text>
                    </Box>
                    <Button bg="bronze.500" color="white" gap={2} px={6}>
                        <Plus size={18} /> Upload New
                    </Button>
                </HStack>

                {/* Filters */}
                <HStack gap={4} wrap="wrap">
                    <Button variant="solid" colorPalette="bronze" size="sm">All Assets</Button>
                    <Button variant="outline" borderColor="cream.300" color="bark.300" size="sm">Videos</Button>
                    <Button variant="outline" borderColor="cream.300" color="bark.300" size="sm">Images</Button>
                    <Button variant="outline" borderColor="cream.300" color="bark.300" size="sm">Audio</Button>
                </HStack>

                {/* Asset Grid */}
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6}>
                    {assets.map((asset, i) => (
                        <Box
                            key={i}
                            bg="white"
                            borderRadius="2xl"
                            borderWidth={1}
                            borderColor="cream.200"
                            overflow="hidden"
                            _hover={{ shadow: "md", borderColor: "bronze.200" }}
                            transition="all 0.2s"
                        >
                            <Center h="140px" bg="cream.50" color="bark.200">
                                <Icon as={getIcon(asset.type)} boxSize={10} />
                            </Center>
                            <Box p={4}>
                                <HStack justify="space-between" mb={1}>
                                    <Text fontWeight="bold" fontSize="sm" color="bark.500" noOfLines={1}>
                                        {asset.name}
                                    </Text>
                                    <IconButton aria-label="More" variant="ghost" size="xs">
                                        <MoreVertical size={14} />
                                    </IconButton>
                                </HStack>
                                <HStack justify="space-between" color="bark.200" fontSize="10px" fontWeight="bold">
                                    <Text>{asset.size}</Text>
                                    <Text>{asset.date}</Text>
                                </HStack>
                                <Separator my={3} />
                                <HStack gap={2}>
                                    <Button size="xs" variant="ghost" flex={1} color="bronze.500" gap={1}>
                                        <Eye size={12} /> View
                                    </Button>
                                    <Button size="xs" variant="ghost" flex={1} color="bark.300" gap={1}>
                                        <Download size={12} /> Get
                                    </Button>
                                    <IconButton aria-label="Delete" size="xs" variant="ghost" color="red.500">
                                        <Trash2 size={12} />
                                    </IconButton>
                                </HStack>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>

                {/* Empty State Mock */}
                {assets.length === 0 && (
                    <Center py={20} flexDirection="column" color="bark.200">
                        <Folder size={60} opacity={0.2} mb={4} />
                        <Text fontWeight="bold">No assets found</Text>
                        <Text fontSize="xs">Upload your first file to get started.</Text>
                    </Center>
                )}
            </VStack>
        </Box>
    );
};

export default AssetsPage;
