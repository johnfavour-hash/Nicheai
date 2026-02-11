import { Box, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import KanbanBoard from "./components/KanbanBoard";

const WorkspacePage = () => {
    const navigate = useNavigate();
    return (
        <Box h="calc(100vh - 100px)" p={6} display="flex" flexDirection="column">
            {/* Page Header */}
            <HStack justify="space-between" mb={8}>
                <Box>
                    <Heading fontSize="2xl" color="bark.500" mb={1}>Workspace</Heading>
                    <Text color="bark.300">Manage your content pipeline from idea to publish.</Text>
                </Box>
                <Button
                    bg="bronze.500"
                    color="white"
                    borderRadius="lg"
                    _hover={{ bg: "bronze.600" }}
                    gap={2}
                    onClick={() => navigate('/dashboard/generator')}
                >
                    <Plus size={18} /> New Project
                </Button>
            </HStack>

            {/* Board Area */}
            <Box flex={1} overflow="hidden">
                <KanbanBoard />
            </Box>
        </Box>
    );
};

export default WorkspacePage;
