import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@components/ui/dialog";
import { Button, Text, SimpleGrid, Icon } from "@chakra-ui/react";
import { Instagram, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { useState } from "react";

interface RepurposeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRepurpose: (platform: string) => void;
}

const RepurposeModal = ({ isOpen, onClose, onRepurpose }: RepurposeModalProps) => {
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

    const platforms = [
        { id: "instagram", name: "Instagram Reel", icon: Instagram, color: "pink.500" },
        { id: "twitter", name: "Twitter Thread", icon: Twitter, color: "blue.400" },
        { id: "linkedin", name: "LinkedIn Post", icon: Linkedin, color: "blue.700" },
        { id: "youtube", name: "YouTube Short", icon: Youtube, color: "red.500" },
    ];

    return (
        <DialogRoot open={isOpen} onOpenChange={onClose}>
            <DialogContent bg="white" borderRadius="2xl">
                <DialogHeader>
                    <DialogTitle fontSize="xl" fontWeight="bold" color="bark.500">
                        Repurpose Content
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Text fontSize="sm" color="bark.300" mb={4}>
                        Transform this content into another format using AI.
                    </Text>
                    <SimpleGrid columns={2} gap={4}>
                        {platforms.map((p) => (
                            <Button
                                key={p.id}
                                h="auto"
                                py={4}
                                variant={selectedPlatform === p.id ? "solid" : "outline"}
                                colorPalette={selectedPlatform === p.id ? "bronze" : "gray"}
                                borderColor={selectedPlatform === p.id ? "bronze.500" : "cream.300"}
                                onClick={() => setSelectedPlatform(p.id)}
                                borderRadius="xl"
                                display="flex"
                                flexDirection="column"
                                gap={2}
                            >
                                <Icon as={p.icon} boxSize={6} color={selectedPlatform === p.id ? "white" : p.color} />
                                <Text fontSize="sm">{p.name}</Text>
                            </Button>
                        ))}
                    </SimpleGrid>
                </DialogBody>
                <DialogFooter borderTopWidth={1} borderColor="cream.100" py={6} px={8}>
                    <Button variant="ghost" onClick={onClose} borderRadius="xl">Cancel</Button>
                    <Button
                        bg="bronze.500"
                        color="white"
                        onClick={() => selectedPlatform && onRepurpose(selectedPlatform)}
                        borderRadius="xl"
                        _hover={{ bg: "bronze.600" }}
                        disabled={!selectedPlatform}
                    >
                        Generate <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
};

export default RepurposeModal;
