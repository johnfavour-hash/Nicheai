import { Box, Flex, IconButton, Image, Text, chakra } from "@chakra-ui/react"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import { Avatar } from "@components/ui/avatar"

const Video = chakra("video")

interface InstagramPreviewProps {
    imageUrl?: string
    videoUrl?: string
    caption: string
    hashtags: string
}

export const InstagramPreview = ({
    imageUrl,
    videoUrl,
    caption,
    hashtags,
}: InstagramPreviewProps) => {
    return (
        <Box
            bg="white"
            color="black"
            maxW="sm"
            mx="auto"
            rounded="xl"
            overflow="hidden"
            shadow="2xl"
            borderWidth="1px"
            borderColor="gray.200"
            fontFamily="sans-serif"
        >
            {/* Header */}
            <Flex align="center" justify="space-between" p={3} borderBottomWidth="1px" borderColor="gray.100">
                <Flex align="center" gap={2}>
                    <Box
                        w={8}
                        h={8}
                        rounded="full"
                        bgGradient="linear(to-tr, yellow.400, purple.600)"
                        p="2px"
                    >
                        <Box
                            w="full"
                            h="full"
                            bg="white"
                            rounded="full"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            overflow="hidden"
                        >
                            <Avatar size="xs" src="https://bit.ly/dan-abramov" />
                        </Box>
                    </Box>
                    <Text fontSize="sm" fontWeight="semibold">
                        you
                    </Text>
                </Flex>
                <IconButton
                    aria-label="Options"
                    variant="ghost"
                    size="sm"
                >
                    <MoreHorizontal size={16} />
                </IconButton>
            </Flex>

            {/* Content */}
            <Box
                bg="gray.100"
                aspectRatio={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                position="relative"
            >
                {videoUrl ? (
                    <Video
                        src={videoUrl}
                        controls
                        w="full"
                        h="full"
                        objectFit="cover"
                    />
                ) : imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="Post"
                        w="full"
                        h="full"
                        objectFit="cover"
                    />
                ) : (
                    <Text color="gray.400" fontSize="xs">
                        No media
                    </Text>
                )}
            </Box>

            {/* Action Bar */}
            <Box p={3} pb={0}>
                <Flex justify="space-between" align="center" mb={3}>
                    <Flex gap={4}>
                        <Heart size={24} />
                        <MessageCircle size={24} />
                        <Send size={24} />
                    </Flex>
                    <Bookmark size={24} />
                </Flex>
                <Text fontWeight="semibold" fontSize="sm" mb={1}>
                    2,483 likes
                </Text>
            </Box>

            {/* Caption */}
            <Box px={3} pb={4}>
                <Text fontSize="sm">
                    <Text as="span" fontWeight="semibold" mr={1}>
                        you
                    </Text>
                    {caption}
                </Text>
                <Text fontSize="sm" color="blue.900" mt={1}>
                    {hashtags}
                </Text>
                <Text color="gray.400" fontSize="xs" mt={2} textTransform="uppercase">
                    2 hours ago
                </Text>
            </Box>
        </Box>
    )
}
