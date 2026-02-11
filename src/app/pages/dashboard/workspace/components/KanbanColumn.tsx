import { Box, HStack, Text, VStack, IconButton } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import KanbanCard from "./KanbanCard";
import type { Project } from "@type/index";

interface KanbanColumnProps {
    title: string;
    count: number;
    projects: Project[];
    color: string;
}

const KanbanColumn = ({ title, count, projects, color }: KanbanColumnProps) => {
    return (
        <Box
            minW="320px"
            w="320px"
            h="full"
            display="flex"
            flexDirection="column"
            bg="cream.100"
            borderRadius="2xl"
            p={3}
        >
            {/* Header */}
            <HStack justify="space-between" mb={4} px={1}>
                <HStack gap={2}>
                    <Box w={3} h={3} borderRadius="full" bg={`${color}.500`} />
                    <Text fontWeight="bold" color="bark.500">{title}</Text>
                    <Box px={2} py={0.5} bg="white" borderRadius="full" shadow="xs">
                        <Text fontSize="xs" fontWeight="bold" color="bark.500">{count}</Text>
                    </Box>
                </HStack>
                <IconButton
                    aria-label="Add item"
                    variant="ghost"
                    size="xs"
                    color="bark.300"
                    _hover={{ bg: "cream.200", color: "bark.500" }}
                >
                    <Plus size={16} />
                </IconButton>
            </HStack>

            {/* Content Area */}
            <VStack
                gap={3}
                align="stretch"
                flex={1}
                overflowY="auto"
                pb={4}
                pr={1}
                css={{
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-track": { background: "transparent" },
                    "&::-webkit-scrollbar-thumb": { background: "#D6D1C5", borderRadius: "4px" }
                }}
            >
                {projects.map((project) => (
                    <KanbanCard key={project.id} project={project} />
                ))}
            </VStack>
        </Box>
    );
};

export default KanbanColumn;
