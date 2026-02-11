import { Box, Flex, VStack, Text, Icon, HStack, Link, Button, Separator } from "@chakra-ui/react";
import {
    LayoutDashboard,
    Wand2,
    Kanban,
    LineChart,
    TrendingUp,
    Briefcase,
    MessageCircle,
    FileText,
    Folder,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Link2 as LinkIcon,
    Palette,
    Target,
    ClipboardList,
    Tv
} from "lucide-react";
import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router";
import useAuthStore from "@stores/auth.store";

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    href: string;
    active?: boolean;
    collapsed?: boolean;
}

const NavItem = ({ icon, label, href, active, collapsed }: NavItemProps) => (
    <Link
        asChild
        w="full"
        _hover={{ textDecoration: "none" }}
    >
        <RouterLink to={href}>
            <HStack
                px={collapsed ? 3 : 4}
                py={3}
                borderRadius="lg"
                bg={active ? "bronze.50" : "transparent"}
                color={active ? "bronze.600" : "bark.300"}
                _hover={{ bg: active ? "bronze.50" : "cream.200", color: active ? "bronze.600" : "bark.500" }}
                transition="all 0.2s"
                gap={4}
                justifyContent={collapsed ? "center" : "flex-start"}
            >
                <Icon as={icon} boxSize={4} strokeWidth={active ? 2.5 : 2} />
                {!collapsed && (
                    <Text fontWeight={active ? "bold" : "medium"} fontSize="sm">
                        {label}
                    </Text>
                )}
            </HStack>
        </RouterLink>
    </Link>
);

interface SidebarProps {
    isMobileMenuOpen?: boolean;
    onClose?: () => void;
}

const Sidebar = ({ isMobileMenuOpen = false, onClose }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { clearAuth } = useAuthStore();

    const sections = [
        {
            title: "GENERAL",
            items: [
                { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
                { icon: Wand2, label: "Generator", href: "/dashboard/generator" },
                { icon: Kanban, label: "Workspace", href: "/dashboard/workspace" },
                { icon: LinkIcon, label: "Integrations", href: "/dashboard/integrations" },
            ]
        },
        {
            title: "CREATIVE",
            items: [
                { icon: TrendingUp, label: "Trends", href: "/dashboard/trends" },
                { icon: Tv, label: "Teleprompter", href: "/dashboard/teleprompter" },
                { icon: FileText, label: "Strategy", href: "/dashboard/strategy" },
            ]
        },
        {
            title: "BUSINESS",
            items: [
                { icon: Briefcase, label: "Monetization", href: "/dashboard/monetization" },
                { icon: MessageCircle, label: "Community", href: "/dashboard/community" },
                { icon: ClipboardList, label: "Operations", href: "/dashboard/operations" },
            ]
        },
        {
            title: "INTELLIGENCE",
            items: [
                { icon: Palette, label: "Brand Kit", href: "/dashboard/brand" },
                { icon: Target, label: "Competitor Scout", href: "/dashboard/spy" },
                { icon: LineChart, label: "Analytics", href: "/dashboard/analytics" },
            ]
        },
        {
            title: "SYSTEM",
            items: [
                { icon: Folder, label: "Asset Library", href: "/dashboard/assets" },
            ]
        }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <Box
                    display={{ base: "block", lg: "none" }}
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="blackAlpha.600"
                    zIndex={999}
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <Flex
                as="aside"
                flexDir="column"
                w={isCollapsed ? "80px" : "260px"}
                h="100vh"
                bg="white"
                borderRightWidth={1}
                borderColor="cream.300"
                transition="all 0.3s ease"
                position={{ base: "fixed", lg: "sticky" }}
                top={0}
                left={{ base: isMobileMenuOpen ? 0 : "-260px", lg: 0 }}
                zIndex={1000}
                display={{ base: "flex", lg: "flex" }}
            >
                {/* Logo Section */}
                <Flex p={6} align="center" justify={isCollapsed ? "center" : "space-between"}>
                    {!isCollapsed && (
                        <Text fontSize="xl" fontWeight="bold" color="bark.500">
                            Niche<Text as="span" color="goldenrod.500">AI</Text>
                        </Text>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        color="bark.300"
                        minW={10}
                        p={0}
                    >
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </Button>
                </Flex>

                {/* Navigation Sections */}
                <VStack flex={1} overflowY="auto" pt={2} px={4} gap={6} align="stretch" css={{
                    '&::-webkit-scrollbar': { width: '4px' },
                    '&::-webkit-scrollbar-thumb': { background: '#F4F2EF' },
                }}>
                    {sections.map((section) => (
                        <Box key={section.title}>
                            {!isCollapsed && (
                                <Text fontSize="10px" fontWeight="black" color="bark.200" mb={3} px={4} letterSpacing="widest">
                                    {section.title}
                                </Text>
                            )}
                            <VStack gap={1}>
                                {section.items.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        {...item}
                                        active={location.pathname === item.href}
                                        collapsed={isCollapsed}
                                    />
                                ))}
                            </VStack>
                        </Box>
                    ))}
                </VStack>

                {/* Bottom Section */}
                <VStack p={4} gap={4} borderTopWidth={1} borderColor="cream.200">
                    {!isCollapsed && (
                        <Box bg="bark.500" p={4} borderRadius="xl" w="full" color="white" position="relative" overflow="hidden">
                            <Box position="absolute" top={-2} right={-2} w={16} h={16} bg="goldenrod.500" opacity={0.1} borderRadius="full" />
                            <VStack align="start" gap={1} mb={3}>
                                <Text fontSize="xs" fontWeight="bold" color="goldenrod.400">PRO PLAN</Text>
                                <Text fontSize="sm" fontWeight="bold">Unlock 4K Video</Text>
                            </VStack>
                            <Button size="xs" w="full" bg="goldenrod.500" color="bark.500" fontWeight="bold">
                                Upgrade Now
                            </Button>
                        </Box>
                    )}

                    <Box w="full">
                        <NavItem icon={Settings} label="Settings" href="/dashboard/settings" collapsed={isCollapsed} />
                        <NavItem icon={HelpCircle} label="Help Center" href="/dashboard/help" collapsed={isCollapsed} />
                        <Separator my={2} borderColor="cream.200" />
                        <Box
                            onClick={() => {
                                clearAuth();
                                navigate("/");
                            }}
                            cursor="pointer"
                            w="full"
                        >
                            <NavItem icon={LogOut} label="Logout" href="#" collapsed={isCollapsed} />
                        </Box>
                    </Box>
                </VStack>
            </Flex>
        </>
    );
};

export default Sidebar;
