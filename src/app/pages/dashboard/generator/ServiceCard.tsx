// components/ServiceCard.tsx
import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router";

export const ServiceCard = ({ title, desc, icon, path }: { title: string; desc: string; icon: string; path: string }) => {
    return (
        <Link to={path} style={{ textDecoration: 'none' }}>
            <Box
                p={4}
                bg="gray.50"
                borderRadius="xl"
                border="1px solid"
                borderColor="transparent"
                transition="all 0.3s ease"
                cursor="pointer"
                _hover={{
                    bg: "white",
                    shadow: "lg",
                    borderColor: "bronze.300",
                    transform: "translateY(-5px)"
                }}
            >
                <VStack align="start" gap={1}>
                    <Text fontSize="2xl">{icon}</Text>
                    <Text fontWeight="semibold" fontSize="sm" color="gray.800">{title}</Text>
                    <Text fontSize="xs" color="gray.500">{desc}</Text>
                </VStack>
            </Box>
        </Link>
    );
};