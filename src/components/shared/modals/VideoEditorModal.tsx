import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@components/ui/dialog";
import { Button, VStack, Box, Text, HStack } from "@chakra-ui/react";
import { Scissors, Music, Type, Wand2 } from "lucide-react";

interface VideoEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const VideoEditorModal = ({ isOpen, onClose, onSave }: VideoEditorModalProps) => {
    const trimValues = [0, 100];

    return (
        <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
            <DialogContent bg="white" borderRadius="2xl">
                <DialogHeader>
                    <DialogTitle fontSize="xl" fontWeight="bold" color="bark.500">
                        AI Video Editor
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <VStack gap={6} align="stretch">
                        {/* Video Preview Placeholder */}
                        <Box
                            h="300px"
                            bg="black"
                            borderRadius="xl"
                            position="relative"
                            overflow="hidden"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color="whiteAlpha.600">Video Preview</Text>
                            {/* Fake timeline overlay */}
                            <Box
                                position="absolute"
                                bottom={4}
                                left={4}
                                right={4}
                                h="40px"
                                bg="whiteAlpha.200"
                                borderRadius="lg"
                                display="flex"
                                alignItems="center"
                                px={2}
                            >
                                <Box w={`${trimValues[0]}%`} h="full" bg="blackAlpha.600" />
                                <Box flex={1} mx={1} borderX="2px solid white" />
                                <Box w={`${100 - trimValues[1]}%`} h="full" bg="blackAlpha.600" />
                            </Box>
                        </Box>

                        {/* Editing Tools */}
                        <HStack justify="center" gap={4}>
                            <Button variant="outline" borderRadius="xl" gap={2}>
                                <Scissors size={18} /> Trim
                            </Button>
                            <Button variant="outline" borderRadius="xl" gap={2}>
                                <Type size={18} /> Captions
                            </Button>
                            <Button variant="outline" borderRadius="xl" gap={2}>
                                <Music size={18} /> Music
                            </Button>
                            <Button variant="solid" colorPalette="purple" borderRadius="xl" gap={2}>
                                <Wand2 size={18} /> AI Enhance
                            </Button>
                        </HStack>
                    </VStack>
                </DialogBody>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} borderRadius="xl">Cancel</Button>
                    <Button bg="bronze.500" color="white" onClick={onSave} borderRadius="xl" _hover={{ bg: "bronze.600" }}>
                        Export Video
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
};

export default VideoEditorModal;
