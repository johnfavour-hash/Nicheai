import { Box, HStack, Text } from "@chakra-ui/react";
import { Star } from "lucide-react";

const Marquee = () => {
    const items = [
        "Creative Studio",
        "Strategic Planning",
        "Growth & Pulse",
        "Business Ops",
        "AI Consulting",
        "Director's Booth",
    ];

    return (
        <Box
            borderTopWidth={1}
            borderBottomWidth={1}
            borderColor="goldenrod.300"
            py={10}
            bg="white"
            overflow="hidden"
        >
            <Box className="animate-marquee" whiteSpace="nowrap">
                {[...Array(4)].map((_, i) => (
                    <HStack key={i} gap={12} mx={6} display="inline-flex">
                        {items.map((item, j) => (
                            <HStack key={j} gap={4}>
                                <Star size={16} fill="#DB9501" color="#DB9501" />
                                <Text
                                    fontSize={{ base: "3xl", lg: "6xl" }}
                                    fontWeight="black"
                                    letterSpacing="tighter"
                                    textTransform="uppercase"
                                    color="bronze.500"
                                >
                                    {item}
                                </Text>
                            </HStack>
                        ))}
                    </HStack>
                ))}
            </Box>
        </Box>
    );
};

export default Marquee;
