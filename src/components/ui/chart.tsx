/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { Box, type BoxProps } from "@chakra-ui/react";
import { ResponsiveContainer } from "recharts";
import { useMemo } from "react";

// Mocking the specific API requested by the user to wrapper Recharts

interface UseChartProps {
    data: any[];
    series: { name: string; color: string }[];
}

export const useChart = ({ data, series }: UseChartProps) => {
    return useMemo(() => {
        return {
            data,
            series,
            key: (name: string) => name,
            color: (name: string) => {
                // Simple mapping for demo purposes. 
                // In a real app, this would resolve Chakra tokens.
                if (name === "border") return "#E2E8F0";
                if (name === "teal.solid") return "#319795"; // teal.500
                if (name.includes(".")) {
                    // Basic token resolution mock
                    const [color] = name.split(".");
                    if (color === "teal") return "#319795";
                    if (color === "blue") return "#3182CE";
                    if (color === "green") return "#38A169";
                    if (color === "purple") return "#805AD5";
                    if (color === "pink") return "#D53F8C";
                    if (color === "cyan") return "#00B5D8";
                    if (color === "orange") return "#DD6B20";
                }
                return name || "#CBD5E0";
            },
        };
    }, [data, series]);
};

interface ChartRootProps extends BoxProps {
    chart: any;
    children: React.ReactNode;
}

const Root = ({ chart, children, ...rest }: ChartRootProps) => {
    return (
        <Box w="full" h="full" {...rest}>
            <ResponsiveContainer width="100%" height="100%">
                {children as React.ReactElement}
            </ResponsiveContainer>
        </Box>
    );
};

const ChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Box
                bg="white"
                p={3}
                borderRadius="md"
                boxShadow="md"
                borderWidth={1}
                borderColor="gray.200"
                fontSize="sm"
            >
                <Box fontWeight="bold" mb={1}>{label}</Box>
                {payload.map((item: any) => (
                    <Box key={item.name} color={item.stroke}>
                        {item.name}: {item.value}
                    </Box>
                ))}
            </Box>
        );
    }
    return null;
};

export const Chart = {
    Root,
    Tooltip: ChartTooltip,
};
