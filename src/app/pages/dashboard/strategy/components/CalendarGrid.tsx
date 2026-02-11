import { Box, Grid, Text, HStack } from "@chakra-ui/react";
import { Instagram, Youtube, Twitter } from "lucide-react";

interface CalendarEvent {
    id: string;
    title: string;
    day: number;
    type: "video" | "post" | "script";
    platform: "instagram" | "youtube" | "twitter";
}

const CalendarGrid = () => {
    const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days grid
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const events: CalendarEvent[] = [
        { id: "1", title: "Teaser", day: 4, type: "video", platform: "instagram" },
        { id: "2", title: "Full Review", day: 8, type: "video", platform: "youtube" },
        { id: "3", title: "Thread", day: 12, type: "post", platform: "twitter" },
        { id: "4", title: "Q&A Session", day: 15, type: "video", platform: "instagram" },
        { id: "5", title: "Launch Day", day: 24, type: "post", platform: "instagram" },
    ];

    const getIcon = (platform: string) => {
        if (platform === "instagram") return Instagram;
        if (platform === "youtube") return Youtube;
        return Twitter;
    };

    return (
        <Box bg="white" borderRadius="2xl" borderWidth={1} borderColor="cream.300" overflow="hidden">
            {/* Header Days */}
            <Grid templateColumns="repeat(7, 1fr)" bg="cream.50" borderBottomWidth={1} borderColor="cream.200">
                {weekDays.map((day) => (
                    <Box key={day} p={3} textAlign="center">
                        <Text fontSize="xs" fontWeight="bold" color="bark.400" textTransform="uppercase">{day}</Text>
                    </Box>
                ))}
            </Grid>

            {/* Calendar Cells */}
            <Grid templateColumns="repeat(7, 1fr)" autoRows="minmax(100px, auto)">
                {days.slice(0, 31).map((day) => {
                    const dayEvents = events.filter(e => e.day === day);
                    return (
                        <Box
                            key={day}
                            p={2}
                            borderRightWidth={1}
                            borderBottomWidth={1}
                            borderColor="cream.100"
                            minH="120px"
                            position="relative"
                            _hover={{ bg: "cream.50" }}
                            transition="colors 0.2s"
                        >
                            <Text fontSize="xs" color="bark.300" mb={1}>{day}</Text>

                            <Box display="flex" flexDirection="column" gap={1}>
                                {dayEvents.map((event) => {
                                    const Icon = getIcon(event.platform);
                                    return (
                                        <HStack
                                            key={event.id}
                                            bg="white"
                                            p={1.5}
                                            borderRadius="md"
                                            shadow="xs"
                                            borderWidth={1}
                                            borderColor="cream.200"
                                            cursor="pointer"
                                            _hover={{ borderColor: "bronze.300", shadow: "sm" }}
                                        >
                                            <Icon size={12} color="#C05805" />
                                            <Text fontSize="xs" fontWeight="medium" isTruncated>{event.title}</Text>
                                        </HStack>
                                    );
                                })}
                            </Box>
                        </Box>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default CalendarGrid;
