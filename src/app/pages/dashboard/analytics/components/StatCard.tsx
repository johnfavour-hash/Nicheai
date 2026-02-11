import { Box, HStack, Text, Badge } from "@chakra-ui/react";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    trend: number;
    icon: LucideIcon;
    color: string;
}

const StatCard = ({ title, value, trend, icon: Icon, color }: StatCardProps) => {
    const isPositive = trend >= 0;

    return (
        <Box
            bg="white"
            p={5}
            borderRadius="2xl"
            borderWidth={1}
            borderColor="cream.300"
            shadow="sm"
            display="flex"
            flexDirection="column"
            gap={3}
        >
            <HStack justify="space-between">
                <Box p={2} bg={`${color}.50`} borderRadius="full" color={`${color}.600`}>
                    <Icon size={20} />
                </Box>
                <Badge
                    colorPalette={isPositive ? "green" : "red"}
                    variant="subtle"
                    px={2}
                    py={0.5}
                    borderRadius="full"
                >
                    <HStack gap={1}>
                        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        <Text>{Math.abs(trend)}%</Text>
                    </HStack>
                </Badge>
            </HStack>

            <Box>
                <Text fontSize="2xl" fontWeight="bold" color="bark.900" lineHeight="1">
                    {value}
                </Text>
                <Text fontSize="sm" color="bark.300" mt={1}>
                    {title}
                </Text>
            </Box>
        </Box>
    );
};

export default StatCard;
