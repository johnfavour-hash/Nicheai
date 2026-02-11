import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Icon,
    Button,
    IconButton,
} from "@chakra-ui/react";
import {
    SliderRoot,
    SliderControl,
    SliderTrack,
    SliderRange,
    SliderThumb
} from "@chakra-ui/react";
import {
    X,
    Play,
    Pause,
    RotateCcw,
    Settings,
    Type,
    Zap
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export const Teleprompter = ({ script: initialScript }: { script?: string }) => {
    const navigate = useNavigate();
    const [script] = useState(initialScript || "Paste your script here to begin professional delivery. Mirror your screen or record directly into your camera while reading.");
    const [scrollSpeed, setScrollSpeed] = useState(50);
    const [fontSize, setFontSize] = useState(48);
    const [isPlaying, setIsPlaying] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (isPlaying && scrollRef.current) {
            interval = setInterval(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop += 1;
                    if (scrollRef.current.scrollTop + scrollRef.current.clientHeight >= scrollRef.current.scrollHeight) {
                        setIsPlaying(false);
                    }
                }
            }, 100 - scrollSpeed);
        }
        return () => clearInterval(interval);
    }, [isPlaying, scrollSpeed]);

    const resetScroll = () => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
        setIsPlaying(false);
    };

    return (
        <Box
            position="fixed"
            inset={0}
            bg="bark.600"
            zIndex={2000}
            color="white"
            display="flex"
            flexDirection="column"
        >
            {/* Top Bar */}
            <HStack bg="blackAlpha.400" px={8} py={4} justify="space-between" backdropFilter="blur(10px)">
                <HStack gap={4}>
                    <Box p={2} bg="bronze.500" borderRadius="lg">
                        <Zap size={20} />
                    </Box>
                    <VStack align="start" gap={0}>
                        <Heading fontSize="lg">AI Teleprompter</Heading>
                        <Text fontSize="10px" color="whiteAlpha.600" fontWeight="bold">PRO DELIVERY STUDIO</Text>
                    </VStack>
                </HStack>

                <HStack gap={6}>
                    <HStack gap={4}>
                        <Icon as={Type} boxSize="16px" />
                        <SliderRoot
                            width="150px"
                            min={24}
                            max={100}
                            value={[fontSize]}
                            onValueChange={(e) => setFontSize(e.value[0])}
                            colorPalette="bronze"
                        >
                            <SliderControl>
                                <SliderTrack bg="whiteAlpha.200">
                                    <SliderRange />
                                </SliderTrack>
                                <SliderThumb index={0} />
                            </SliderControl>
                        </SliderRoot>
                    </HStack>

                    <HStack gap={4}>
                        <Icon as={Zap} boxSize="16px" />
                        <SliderRoot
                            width="150px"
                            min={0}
                            max={100}
                            value={[scrollSpeed]}
                            onValueChange={(e) => setScrollSpeed(e.value[0])}
                            colorPalette="bronze"
                        >
                            <SliderControl>
                                <SliderTrack bg="whiteAlpha.200">
                                    <SliderRange />
                                </SliderTrack>
                                <SliderThumb index={0} />
                            </SliderControl>
                        </SliderRoot>
                    </HStack>

                    <IconButton
                        aria-label="Close"
                        variant="ghost"
                        color="white"
                        onClick={() => navigate(-1)}
                    >
                        <X size={24} />
                    </IconButton>
                </HStack>
            </HStack>

            {/* Main Script Area */}
            <Box flex={1} position="relative" overflow="hidden">
                {/* Visual Guide Overlay */}
                <Box
                    position="absolute"
                    top="40%"
                    left={0}
                    right={0}
                    h="120px"
                    bg="whiteAlpha.100"
                    pointerEvents="none"
                    borderYWidth={2}
                    borderColor="bronze.500"
                    zIndex={1}
                />

                <Box
                    ref={scrollRef}
                    h="full"
                    overflowY="auto"
                    px={{ base: 10, lg: 40 }}
                    py="40vh"
                    textAlign="center"
                    css={{
                        '&::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    }}
                >
                    <Text
                        fontSize={`${fontSize}px`}
                        fontWeight="black"
                        lineHeight="1.5"
                        color="white"
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {script}
                    </Text>
                </Box>
            </Box>

            {/* Bottom Controls */}
            <HStack bg="blackAlpha.400" py={10} justify="center" gap={10} backdropFilter="blur(10px)">
                <IconButton
                    aria-label="Restart"
                    size="xl"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    onClick={resetScroll}
                    _hover={{ bg: "whiteAlpha.100" }}
                >
                    <RotateCcw size={28} />
                </IconButton>

                <Button
                    size="2xl"
                    bg="bronze.500"
                    color="white"
                    borderRadius="full"
                    px={12}
                    shadow="2xl"
                    gap={4}
                    onClick={() => setIsPlaying(!isPlaying)}
                    _hover={{ transform: "scale(1.05)", bg: "bronze.600" }}
                    transition="all 0.2s"
                >
                    {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
                    <Text fontSize="lg" fontWeight="black">{isPlaying ? "PAUSE" : "START SCROLL"}</Text>
                </Button>

                <IconButton
                    aria-label="Settings"
                    size="xl"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    _hover={{ bg: "whiteAlpha.100" }}
                >
                    <Settings size={28} />
                </IconButton>
            </HStack>
        </Box>
    );
};

export default Teleprompter;
