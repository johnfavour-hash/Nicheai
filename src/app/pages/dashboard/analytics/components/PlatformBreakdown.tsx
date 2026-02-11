import { Box, HStack, Text, Progress, Circle } from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";

const PlatformBreakdown = () => {
    const platforms = [
        { name: "Instagram", value: 65, color: "pink", count: "12.4k" },
        { name: "TikTok", value: 45, color: "cyan", count: "8.2k" },
        { name: "YouTube", value: 25, color: "red", count: "2.1k" },
        { name: "Twitter", value: 15, color: "blue", count: "1.5k" },
    ];

    return (
        <Box
            bg="white"
            p={6}
            borderRadius="2xl"
            borderWidth={1}
            borderColor="cream.300"
            shadow="sm"
            h="full"
        >
            <Text fontSize="lg" fontWeight="bold" color="bark.500" mb={6}>Platform Performance</Text>

            <Grid gap={5}>
                {platforms.map((p) => (
                    <Box key={p.name}>
                        <HStack justify="space-between" mb={2}>
                            <HStack gap={2}>
                                <Circle size={2} bg={`${p.color}.500`} />
                                <Text fontSize="sm" fontWeight="medium" color="bark.400">{p.name}</Text>
                            </HStack>
                            <Text fontSize="sm" fontWeight="bold" color="bark.500">{p.count}</Text>
                        </HStack>
                        <Progress.Root value={p.value} size="sm" colorPalette={p.color} borderRadius="full">
                            <Progress.Track bg={`${p.color}.50`}>
                                <Progress.Range borderRadius="full" />
                            </Progress.Track>
                        </Progress.Root>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default PlatformBreakdown;
