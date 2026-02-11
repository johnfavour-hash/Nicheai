import { Box, Text, HStack, Badge, Avatar, IconButton } from "@chakra-ui/react";
import { MoreHorizontal, Calendar, MessageSquare } from "lucide-react";

import type { Project } from "@type/index";

interface KanbanCardProps {
    project: Project;
}

const getPlatformColor = (platform: string | undefined) => {
    if (!platform) return "gray";
    switch (platform) {
        case "instagram": return "pink";
        case "tiktok": return "cyan";
        case "twitter": return "blue";
        case "youtube": return "red";
        default: return "gray";
    }
};

const KanbanCard = ({ project }: KanbanCardProps) => {
    return (
        <Box
            p={4}
            bg="white"
            borderRadius="xl"
            borderWidth={1}
            borderColor="cream.300"
            shadow="sm"
            cursor="pointer"
            _hover={{ shadow: "md", borderColor: "bronze.200", transform: "translateY(-2px)" }}
            transition="all 0.2s"
        >
            <HStack justify="space-between" mb={3} align="start">
                <Badge colorPalette={getPlatformColor(project.platform)} variant="subtle" borderRadius="full" px={2}>
                    {project.platform}
                </Badge>
                <IconButton aria-label="More options" variant="ghost" size="xs" color="bark.300">
                    <MoreHorizontal size={16} />
                </IconButton>
            </HStack>

            <Text fontWeight="bold" color="bark.500" mb={3} lineHeight="tall">
                {project.title}
            </Text>

            <HStack justify="space-between" mt={4}>
                <HStack gap={3}>
                    {project.dueDate && (
                        <HStack gap={1} color="bark.300" fontSize="xs">
                            <Calendar size={14} />
                            <Text>{project.dueDate}</Text>
                        </HStack>
                    )}
                    {(project.comments || 0) > 0 && (
                        <HStack gap={1} color="bark.300" fontSize="xs">
                            <MessageSquare size={14} />
                            <Text>{project.comments}</Text>
                        </HStack>
                    )}
                </HStack>

                <Avatar.Root size="xs">
                    <Avatar.Fallback name="User" />
                    <Avatar.Image src="https://bit.ly/dan-abramov" />
                </Avatar.Root>
            </HStack>
        </Box>
    );
};

export default KanbanCard;
