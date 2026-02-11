import { Box, Container, SimpleGrid, Text, VStack, Icon } from "@chakra-ui/react";
import { Zap, ShieldCheck, Activity, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@utils/animations";

const MotionSimpleGrid = motion(SimpleGrid);
const MotionVStack = motion(VStack);

const stats = [
    { icon: Activity, count: "99.9%", label: "API Uptime" },
    { icon: Zap, count: "< 2s", label: "Avg. Generation Time" },
    { icon: ShieldCheck, count: "0%", label: "Data Training Usage" },
    { icon: Globe, count: "140+", label: "Supported Languages" },
];

const Stats = () => {
    return (
        <Box as="section" bg="bark.500" py={20}>
            <Container maxW="7xl" px={6}>
                <MotionSimpleGrid
                    columns={{ base: 1, sm: 2, lg: 4 }}
                    gap={{ base: 10, lg: 12 }}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {stats.map((stat, idx) => (
                        <MotionVStack key={idx} textAlign="center" color="white" gap={2} variants={fadeInUp}>
                            <Icon as={stat.icon} boxSize="32px" color="bronze.500" mb={2} />
                            <Text fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="black">
                                {stat.count}
                            </Text>
                            <Text
                                color="cream.300"
                                fontWeight="bold"
                                letterSpacing="widest"
                                textTransform="uppercase"
                                fontSize="xs"
                                opacity={0.6}
                            >
                                {stat.label}
                            </Text>
                        </MotionVStack>
                    ))}
                </MotionSimpleGrid>
            </Container>
        </Box>
    );
};

export default Stats;

