import { Box, HStack } from "@chakra-ui/react";
import KanbanColumn from "./KanbanColumn";
import useAppStore from "@stores/app.store";
import type { ProjectStatus } from "@type/index";

const KanbanBoard = () => {
    const { projects } = useAppStore();

    const getProjectsByStatus = (status: ProjectStatus) =>
        projects.filter(p => p.status === status);

    return (
        <Box h="full" overflowX="auto" pb={4}>
            <HStack align="start" gap={4} h="full" minW="fit-content" px={1}>
                <KanbanColumn
                    title="Ideas"
                    color="gray"
                    count={getProjectsByStatus("idea").length}
                    projects={getProjectsByStatus("idea")}
                />
                <KanbanColumn
                    title="Scripting"
                    color="blue"
                    count={getProjectsByStatus("scripting").length}
                    projects={getProjectsByStatus("scripting")}
                />
                <KanbanColumn
                    title="Production"
                    color="purple"
                    count={getProjectsByStatus("production").length}
                    projects={getProjectsByStatus("production")}
                />
                <KanbanColumn
                    title="Review"
                    color="orange"
                    count={getProjectsByStatus("review").length}
                    projects={getProjectsByStatus("review")}
                />
                <KanbanColumn
                    title="Published"
                    color="green"
                    count={getProjectsByStatus("published").length}
                    projects={getProjectsByStatus("published")}
                />
            </HStack>
        </Box>
    );
};

export default KanbanBoard;
