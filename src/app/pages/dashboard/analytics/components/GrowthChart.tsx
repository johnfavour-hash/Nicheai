import { Chart, useChart } from "@components/ui/chart";
import { CartesianGrid, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts";
import { Box, Text, Flex } from "@chakra-ui/react";

const GrowthChart = () => {
    const chart = useChart({
        data: [
            { growth: 1200, month: "Week 1" },
            { growth: 1800, month: "Week 2" },
            { growth: 2100, month: "Week 3" },
            { growth: 2400, month: "Week 4" },
        ],
        series: [{ name: "growth", color: "orange.solid" }],
    });

    return (
        <Box
            bg="white"
            p={6}
            borderRadius="2xl"
            borderWidth={1}
            borderColor="cream.300"
            shadow="sm"
            h="full"
            display="flex"
            flexDirection="column"
        >
            <Flex justify="space-between" align="center" mb={6}>
                <Box>
                    <Text fontSize="lg" fontWeight="bold" color="bark.500">Audience Growth</Text>
                    <Text fontSize="sm" color="bark.300">Last 30 days</Text>
                </Box>
                <Text fontSize="2xl" fontWeight="bold" color="bronze.500">+2.4k</Text>
            </Flex>

            <Box flex={1} minH="200px">
                <Chart.Root maxH="sm" chart={chart}>
                    <AreaChart data={chart.data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#C05805" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#C05805" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#718096', fontSize: 12 }}
                            tickMargin={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#718096', fontSize: 12 }}
                        />
                        <Tooltip content={<Chart.Tooltip />} cursor={{ stroke: '#C05805', strokeWidth: 1, strokeDasharray: '3 3' }} />
                        <Area
                            type="monotone"
                            dataKey="growth"
                            stroke="#C05805"
                            fillOpacity={1}
                            fill="url(#colorGrowth)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </Chart.Root>
            </Box>
        </Box>
    );
};

export default GrowthChart;
