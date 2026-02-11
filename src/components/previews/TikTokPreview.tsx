import { Box, Flex, Text, VStack, chakra } from "@chakra-ui/react"
import { Heart, MessageCircle, Share2, Music } from "lucide-react"

const Video = chakra("video")

interface TikTokPreviewProps {
    videoUrl?: string
    caption: string
    hashtags: string
}

export const TikTokPreview = ({
    videoUrl,
    caption,
    hashtags,
}: TikTokPreviewProps) => {
    return (
        <Box
            bg="black"
            color="white"
            maxW="xs"
            mx="auto"
            h="600px"
            rounded="2xl"
            overflow="hidden"
            position="relative"
            shadow="2xl"
            borderWidth="1px"
            borderColor="gray.800"
            fontFamily="sans-serif"
        >
            {/* Header/Top Bar */}
            <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                p={4}
                zIndex={20}
                justify="center"
                fontSize="sm"
                fontWeight="semibold"
                color="gray.300"
            >
                <Text>Following</Text>
                <Text mx={2}>|</Text>
                <Text color="white" fontWeight="bold">
                    For You
                </Text>
            </Flex>

            {/* Video Background */}
            <Box
                position="absolute"
                inset={0}
                zIndex={0}
                bg="gray.900"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {videoUrl ? (
                    <Video
                        src={videoUrl}
                        className="w-full h-full object-cover opacity-90"
                        autoPlay
                        loop
                        muted
                        playsInline
                        w="full"
                        h="full"
                        objectFit="cover"
                        opacity={0.9}
                    />
                ) : (
                    <Text color="gray.500" fontSize="sm">
                        No Video Preview
                    </Text>
                )}
            </Box>

            {/* Right Sidebar Icons */}
            <VStack
                position="absolute"
                right={2}
                bottom={20}
                zIndex={20}
                gap={6}
                align="center"
            >
                <Box w={10} h={10} rounded="full" bg="gray.200" borderWidth="1px" borderColor="white" />
                <VStack gap={0}>
                    <Heart size={32} fill="white" />
                    <Text fontSize="xs" fontWeight="bold">
                        84.2K
                    </Text>
                </VStack>
                <VStack gap={0}>
                    <MessageCircle size={32} fill="white" />
                    <Text fontSize="xs" fontWeight="bold">
                        1042
                    </Text>
                </VStack>
                <VStack gap={0}>
                    <Box transform="rotate(45deg)">
                        <Box w={6} h={6} bg="white" rounded="sm" />
                    </Box>
                    <Text fontSize="xs" fontWeight="bold" mt={1}>
                        520
                    </Text>
                </VStack>
                <VStack gap={0}>
                    <Share2 size={32} fill="white" />
                    <Text fontSize="xs" fontWeight="bold">
                        Share
                    </Text>
                </VStack>
            </VStack>

            {/* Bottom Info */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                p={4}
                pb={6}
                zIndex={20}
                bgGradient="linear(to-t, blackAlpha.800, transparent)"
            >
                <Box mb={2}>
                    <Text fontWeight="bold" mb={1} textShadow="0 1px 2px rgba(0,0,0,0.5)">
                        @yourhandle
                    </Text>
                    <Box height="3.2em" overflow="hidden">
                        <Text fontSize="sm" lineHeight="tight" textShadow="0 1px 2px rgba(0,0,0,0.5)">
                            {caption} <Text as="span" fontWeight="bold">{hashtags}</Text>
                        </Text>
                    </Box>
                </Box>
                <Flex align="center" gap={2}>
                    <Music size={16} />
                    <Text fontSize="xs" fontWeight="medium" w={32} overflow="hidden" whiteSpace="nowrap">
                        Original Sound - @yourhandle
                    </Text>
                </Flex>
            </Box>
        </Box>
    )
}
