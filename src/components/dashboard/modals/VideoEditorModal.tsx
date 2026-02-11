import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@components/ui/dialog";
import { Button, VStack, Box, Text, HStack, Center } from "@chakra-ui/react";
import { Scissors, Music, Type, Wand2, Play, Pause } from "lucide-react";
import { useState } from "react";

interface VideoEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: () => void;
}

export const VideoEditorModal = ({ isOpen, onClose, onSave }: VideoEditorModalProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
            <DialogContent bg="white" borderRadius="3xl" p={0} overflow="hidden" boxShadow="2xl">
                {/* Clean Header */}
                <DialogHeader bg="white" py={4} px={6} borderBottomWidth={1} borderColor="cream.200">
                    <DialogTitle fontSize="lg" fontWeight="bold" color="bark.500">
                        AI Video Editor
                    </DialogTitle>
                    <DialogCloseTrigger top={4} right={4} color="bark.300" />
                </DialogHeader>

                <DialogBody p={6} bg="white">
                    <VStack gap={6} align="stretch">
                        {/* Video Preview Area */}
                        <Box
                            h="350px"
                            borderRadius="2xl"
                            position="relative"
                            overflow="hidden"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="black"
                            shadow="lg"
                        >
                            <Box
                                boxSize="80px"
                                borderRadius="full"
                                bg="whiteAlpha.200"
                                backdropFilter="blur(8px)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                cursor="pointer"
                                onClick={() => setIsPlaying(!isPlaying)}
                                transition="all 0.2s"
                                _hover={{ transform: "scale(1.1)", bg: "whiteAlpha.300" }}
                            >
                                {isPlaying ? <Pause size={32} fill="white" color="white" /> : <Play size={32} fill="white" color="white" style={{ marginLeft: "4px" }} />}
                            </Box>

                            <Text position="absolute" bottom="50%" transform="translateY(40px)" color="whiteAlpha.600" fontSize="sm">
                                Video Preview
                            </Text>

                            {/* Timeline Overlay at Bottom */}
                            <Box
                                position="absolute"
                                bottom={4}
                                left={4}
                                right={4}
                                h="48px"
                                bg="whiteAlpha.200"
                                borderRadius="xl"
                                display="flex"
                                alignItems="center"
                                px={3}
                                backdropFilter="blur(12px)"
                                border="1px solid"
                                borderColor="whiteAlpha.100"
                            >
                                {/* Mock Timeline content */}
                                <Box w="20%" h="full" bg="blackAlpha.500" borderRightRadius="xs" />
                                <Box flex={1} position="relative" h="full">
                                    <Center h="full">
                                        <Box w="full" h="24px" bg="whiteAlpha.100" borderRadius="sm" />
                                    </Center>
                                </Box>
                                <Box w="15%" h="full" bg="blackAlpha.500" borderLeftRadius="xs" />
                            </Box>
                        </Box>

                        {/* Editing Tools - Centered Pills */}
                        <HStack justify="center" gap={3}>
                            <ToolBtn icon={Scissors} label="Trim" />
                            <ToolBtn icon={Type} label="Captions" />
                            <ToolBtn icon={Music} label="Music" />
                            <Button
                                size="md"
                                bg="purple.600"
                                color="white"
                                borderRadius="xl"
                                px={5}
                                fontSize="sm"
                                fontWeight="bold"
                                _hover={{ bg: "purple.700" }}
                                gap={2}
                            >
                                <Wand2 size={16} /> AI Enhance
                            </Button>
                        </HStack>
                    </VStack>
                </DialogBody>

                {/* Footer - Right Aligned Actions */}
                <DialogFooter bg="white" borderTopWidth={1} borderColor="cream.100" py={6} px={8}>
                    <HStack w="full" justify="flex-end" gap={3}>
                        <Button
                            variant="ghost"
                            color="bark.500"
                            borderRadius="xl"
                            fontWeight="medium"
                            onClick={onClose}
                            _hover={{ bg: "cream.100" }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg="bronze.500"
                            color="white"
                            borderRadius="xl"
                            px={6}
                            fontWeight="bold"
                            _hover={{ bg: "bronze.600" }}
                            onClick={onSave || onClose}
                            shadow="md"
                        >
                            Export Video
                        </Button>
                    </HStack>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};

const ToolBtn = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
    <Button
        variant="outline"
        color="bark.500"
        borderColor="cream.300"
        bg="white"
        size="md"
        borderRadius="xl"
        fontSize="sm"
        fontWeight="medium"
        _hover={{ bg: "cream.50", borderColor: "bronze.300", color: "bronze.600" }}
        gap={2}
        shadow="xs"
    >
        <Icon size={16} /> {label}
    </Button>
);
