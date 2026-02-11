import { Box, Flex, HStack, Image, Text, chakra } from "@chakra-ui/react"
import { MessageCircle, Repeat2, Heart, BarChart2 } from "lucide-react"
import { Avatar } from "@components/ui/avatar"

const Video = chakra("video")

interface TwitterPreviewProps {
    text: string
    imageUrl?: string
    videoUrl?: string
}

export const TwitterPreview = ({
    text,
    imageUrl,
    videoUrl,
}: TwitterPreviewProps) => {
    return (
        <Box
            bg="white"
            color="black"
            maxW="lg"
            mx="auto"
            rounded="xl"
            borderWidth="1px"
            borderColor="gray.200"
            p={4}
            fontFamily="sans-serif"
            shadow="md"
        >
            <Flex gap={3}>
                <Box flexShrink={0}>
                    <Avatar size="md" src="https://bit.ly/dan-abramov" />
                </Box>
                <Box flexGrow={1} minW={0}>
                    <Flex align="center" gap={1}>
                        <Text fontWeight="bold" fontSize="sm">
                            You
                        </Text>
                        <Text color="gray.500" fontSize="sm">
                            @yourhandle · 1h
                        </Text>
                    </Flex>

                    <Text fontSize="15px" whiteSpace="pre-wrap" mb={3} mt={1} lineHeight="normal" color="gray.900">
                        {text}
                    </Text>

                    {(imageUrl || videoUrl) && (
                        <Box rounded="xl" overflow="hidden" borderWidth="1px" borderColor="gray.200" mb={3}>
                            {videoUrl ? (
                                <Video
                                    src={videoUrl}
                                    controls
                                    w="full"
                                    maxH="24rem"
                                    objectFit="cover"
                                />
                            ) : (
                                <Image
                                    src={imageUrl}
                                    alt="Post media"
                                    w="full"
                                    maxH="96"
                                    objectFit="cover"
                                />
                            )}
                        </Box>
                    )}

                    <HStack justify="space-between" color="gray.500" fontSize="sm" maxW="md" pt={2}>
                        <Flex align="center" gap={2} _hover={{ color: "blue.400" }} cursor="pointer">
                            <MessageCircle size={18} />
                            <Text>24</Text>
                        </Flex>
                        <Flex align="center" gap={2} _hover={{ color: "green.400" }} cursor="pointer">
                            <Repeat2 size={18} />
                            <Text>12</Text>
                        </Flex>
                        <Flex align="center" gap={2} _hover={{ color: "pink.600" }} cursor="pointer">
                            <Heart size={18} />
                            <Text>142</Text>
                        </Flex>
                        <Flex align="center" gap={2} _hover={{ color: "blue.400" }} cursor="pointer">
                            <BarChart2 size={18} />
                            <Text>2.4K</Text>
                        </Flex>
                    </HStack>
                </Box>
            </Flex>
        </Box>
    )
}
