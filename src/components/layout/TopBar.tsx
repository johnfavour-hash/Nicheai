import { Flex, Box, Input, HStack, Text, Button, VStack, Heading, IconButton, Icon, Breadcrumb } from "@chakra-ui/react";
import { Search, Bell, Grid, Menu, ChevronRight } from "lucide-react";
import useAuthStore from "@stores/auth.store";
import { useLocation, useNavigate } from "react-router";

interface TopBarProps {
    onMenuToggle: () => void;
}

const TopBar = ({ onMenuToggle }: TopBarProps) => {
    const { user } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();

    const getBreadcrumbs = (pathname: string) => {
        const parts = pathname.split('/').filter(Boolean);
        return parts.map((part, index) => {
            const href = '/' + parts.slice(0, index + 1).join('/');
            const label = part.charAt(0).toUpperCase() + part.slice(1);
            return { label, href, isCurrent: index === parts.length - 1 };
        });
    };

    const breadcrumbs = getBreadcrumbs(location.pathname);
    const pageTitle = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : "Dashboard";

    return (
        <Flex
            as="nav"
            h="70px"
            bg="white"
            borderBottomWidth={1}
            borderColor="cream.300"
            px={{ base: 4, md: 8 }}
            align="center"
            justify="space-between"
            position="sticky"
            top={0}
            zIndex={10}
        >
            <HStack gap={{ base: 2, md: 8 }}>
                {/* Mobile Menu Button */}
                <IconButton
                    display={{ base: "flex", lg: "none" }}
                    variant="ghost"
                    onClick={onMenuToggle}
                    color="bark.500"
                >
                    <Icon as={Menu} />
                </IconButton>

                <VStack align="start" gap={0}>
                    <Breadcrumb.Root size="sm" color="bark.200" separator={<ChevronRight size={12} />} display={{ base: "none", md: "flex" }}>
                        <Breadcrumb.List>
                            {breadcrumbs.map((bc, i) => (
                                <Breadcrumb.Item key={i}>
                                    <Breadcrumb.Link asChild>
                                        <Text
                                            cursor="pointer"
                                            onClick={() => navigate(bc.href)}
                                            fontWeight={bc.isCurrent ? "bold" : "medium"}
                                            color={bc.isCurrent ? "bark.500" : "bark.200"}
                                        >
                                            {bc.label}
                                        </Text>
                                    </Breadcrumb.Link>
                                </Breadcrumb.Item>
                            ))}
                        </Breadcrumb.List>
                    </Breadcrumb.Root>
                    <Heading fontSize={{ base: "lg", md: "xl" }} color="bark.500" fontWeight="black" letterSpacing="tight">
                        {pageTitle}
                    </Heading>
                </VStack>

                {/* Search Bar */}
                <Box w="400px" position="relative" display={{ base: "none", lg: "block" }}>
                    <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1}>
                        <Search size={18} color="var(--chakra-colors-bark-300)" />
                    </Box>
                    <Input
                        placeholder="Search resources, projects..."
                        bg="cream.100"
                        border="none"
                        borderRadius="xl"
                        pl={10}
                        _focus={{ bg: "white", outline: "2px solid {colors.bronze.500}" }}
                    />
                </Box>
            </HStack>

            {/* Right Side Icons */}
            <HStack gap={4}>
                <Button
                    variant="ghost"
                    color="bark.300"
                    _hover={{ bg: "cream.200", color: "bronze.500" }}
                    minW={10}
                    p={0}
                >
                    <Bell size={20} />
                </Button>
                <Button
                    variant="ghost"
                    color="bark.300"
                    _hover={{ bg: "cream.200", color: "bronze.500" }}
                    minW={10}
                    p={0}
                >
                    <Grid size={20} />
                </Button>

                <Box w="1px" h="24px" bg="cream.300" mx={2} />

                <HStack
                    gap={3}
                    cursor="pointer"
                    p={1}
                    borderRadius="full"
                    _hover={{ bg: "cream.100" }}
                    onClick={() => navigate("/dashboard/settings")}
                >
                    <VStack align="end" gap={0} display={{ base: "none", md: "flex" }}>
                        <Text fontSize="sm" fontWeight="bold" color="bark.500">
                            {user?.name || "Young Alaska"}
                        </Text>
                        <Text fontSize="xs" color="bark.200">
                            Business Plan
                        </Text>
                    </VStack>
                    <Box
                        w={10}
                        h={10}
                        borderRadius="full"
                        bg="bronze.500"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontWeight="bold"
                        border="2px solid"
                        borderColor="bronze.500"
                    >
                        {(user?.name || "Y").charAt(0)}
                    </Box>
                </HStack>
            </HStack>
        </Flex>
    );
};

export default TopBar;
