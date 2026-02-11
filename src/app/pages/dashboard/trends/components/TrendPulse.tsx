import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Icon,
    Badge,
    Button,
    Spinner,
    SimpleGrid,
    Link,
    Center
} from "@chakra-ui/react";
import { Globe, Zap, ArrowUpRight, Newspaper } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { fetchTrendingNews } from "@services/gemini.service";
import useAppStore from "@stores/app.store";
import type { TrendNewsItem } from "@type/index";

export const TrendPulse = () => {
    const { niche } = useAppStore();
    const [news, setNews] = useState<TrendNewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const refreshTrends = useCallback(async () => {
        setIsLoading(true);
        try {
            const trends = await fetchTrendingNews(niche);
            setNews(trends);
        } catch (error) {
            console.error("Failed to fetch trends", error);
        } finally {
            setIsLoading(false);
        }
    }, [niche]);

    useEffect(() => {
        refreshTrends();
    }, [refreshTrends]);

    return (
        <VStack align="stretch" gap={6}>
            <HStack justify="space-between">
                <HStack gap={3}>
                    <Box p={2} bg="bronze.50" borderRadius="xl" color="bronze.500">
                        <Globe size={24} />
                    </Box>
                    <Box>
                        <Heading fontSize="xl" color="bark.500">Trend Pulse</Heading>
                        <Text fontSize="sm" color="bark.300">Viral news and topics in {niche}</Text>
                    </Box>
                </HStack>
                <Button
                    variant="surface"
                    size="sm"
                    onClick={refreshTrends}
                    loading={isLoading}
                    colorPalette="bronze"
                >
                    Refresh News
                </Button>
            </HStack>

            {isLoading ? (
                <Center py={20}>
                    <VStack gap={4}>
                        <Spinner size="xl" color="bronze.500" borderWidth="4px" />
                        <Text color="bark.300" fontWeight="medium">Scanning the niche for virality...</Text>
                    </VStack>
                </Center>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                    {news.map((item, index) => (
                        <Box
                            key={index}
                            p={5}
                            bg="white"
                            borderRadius="2xl"
                            borderWidth={1}
                            borderColor="cream.200"
                            _hover={{ borderColor: "bronze.300", transform: "translateY(-2px)", shadow: "md" }}
                            transition="all 0.2s"
                            display="flex"
                            flexDirection="column"
                        >
                            <HStack justify="space-between" mb={3}>
                                <Badge colorPalette="bronze" variant="subtle" px={2} borderRadius="full">
                                    {item.source}
                                </Badge>
                                <Text fontSize="xs" color="bark.200">{item.timeAgo}</Text>
                            </HStack>

                            <Heading fontSize="md" color="bark.500" mb={2} lineClamp={2}>
                                {item.title}
                            </Heading>

                            <Text fontSize="sm" color="bark.300" mb={4} lineClamp={3}>
                                {item.summary}
                            </Text>

                            <Box mt="auto">
                                <HStack justify="space-between">
                                    <Link href={item.url} target="_blank" _hover={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="ghost"
                                            size="xs"
                                            color="bronze.600"
                                            p={0}
                                            _hover={{ bg: 'transparent', textDecoration: 'underline' }}
                                        >
                                            Read Source <Icon as={ArrowUpRight} ml={1} />
                                        </Button>
                                    </Link>
                                    <Button
                                        size="xs"
                                        bg="bark.500"
                                        color="white"
                                        _hover={{ bg: "bark.600" }}
                                        gap={1}
                                    >
                                        <Zap size={12} /> Create Post
                                    </Button>
                                </HStack>
                            </Box>
                        </Box>
                    ))}

                    {news.length === 0 && (
                        <Center gridColumn="1 / -1" py={10}>
                            <VStack color="bark.200">
                                <Newspaper size={48} opacity={0.3} />
                                <Text>No trends found for this niche yet.</Text>
                            </VStack>
                        </Center>
                    )}
                </SimpleGrid>
            )}
        </VStack>
    );
};
