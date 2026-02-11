import {
    Box,
    Button,
    Heading,
    Input,
    Text,
    VStack,
    HStack
} from "@chakra-ui/react";
import { Save, Key, User, Shield } from "lucide-react";
import useAuthStore from "@stores/auth.store";
import { useState, useEffect } from "react";
import { toaster } from "@components/ui/toaster";

const SettingsPage = () => {
    const { user } = useAuthStore();
    const [apiKey, setApiKey] = useState("");

    // Load existing key from localStorage on mount
    useEffect(() => {
        const storedKey = localStorage.getItem("VITE_GEMINI_API_KEY");
        if (storedKey) setApiKey(storedKey);
    }, []);

    const handleSaveKey = () => {
        if (!apiKey.trim()) {
            toaster.create({ title: "Please enter a valid API key", type: "error" });
            return;
        }
        // Save to localStorage so the service can pick it up
        localStorage.setItem("VITE_GEMINI_API_KEY", apiKey);
        toaster.create({ title: "API Key saved successfully", type: "success" });
    };

    return (
        <Box maxW="4xl" mx="auto" py={8}>
            <Heading fontSize="2xl" color="bark.500" mb={2}>Settings & Preferences</Heading>
            <Text color="bark.300" mb={8}>Manage your account and AI configuration.</Text>

            <VStack gap={8} align="stretch">
                {/* AI Configuration Section */}
                <Box bg="white" p={8} borderRadius="2xl" borderWidth={1} borderColor="cream.300" shadow="sm">
                    <HStack gap={4} mb={6}>
                        <Box p={3} bg="bronze.50" borderRadius="xl" color="bronze.500">
                            <Key size={24} />
                        </Box>
                        <Box>
                            <Heading fontSize="lg" color="bark.500">AI Configuration</Heading>
                            <Text fontSize="sm" color="bark.300">Manage your connection to Gemini AI</Text>
                        </Box>
                    </HStack>

                    <VStack align="start" gap={4}>
                        <Text fontWeight="bold" color="bark.500">Gemini API Key</Text>
                        <Input
                            placeholder="Enter your Gemini API Key..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            type="password"
                            bg="cream.50"
                            border="none"
                            borderRadius="lg"
                            size="lg"
                        />
                        <Text fontSize="xs" color="bark.300">
                            Your key is stored locally in your browser and never sent to our servers.
                        </Text>
                        <Button
                            onClick={handleSaveKey}
                            bg="bronze.500"
                            color="white"
                            size="md"
                            borderRadius="lg"
                            _hover={{ bg: "bronze.600" }}
                            gap={2}
                        >
                            <Save size={18} /> Save Configuration
                        </Button>
                    </VStack>
                </Box>

                {/* Profile Section */}
                <Box bg="white" p={8} borderRadius="2xl" borderWidth={1} borderColor="cream.300" shadow="sm">
                    <HStack gap={4} mb={6}>
                        <Box p={3} bg="cream.100" borderRadius="xl" color="bark.500">
                            <User size={24} />
                        </Box>
                        <Box>
                            <Heading fontSize="lg" color="bark.500">Profile Settings</Heading>
                            <Text fontSize="sm" color="bark.300">Update your personal information</Text>
                        </Box>
                    </HStack>

                    <HStack gap={6} align="start" wrap="wrap">
                        <VStack>
                            <Box
                                w="100px"
                                h="100px"
                                bg="bronze.500"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="white"
                                fontSize="3xl"
                                fontWeight="bold"
                            >
                                {user?.name?.charAt(0) || "U"}
                            </Box>
                            <Button variant="ghost" size="sm" color="bronze.500">Change Avatar</Button>
                        </VStack>

                        <VStack flex={1} align="stretch" gap={4}>
                            <Box>
                                <Text fontWeight="bold" color="bark.500" mb={2}>Full Name</Text>
                                <Input defaultValue={user?.name} bg="cream.50" border="none" borderRadius="lg" />
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color="bark.500" mb={2}>Email Address</Text>
                                <Input defaultValue={user?.email} bg="cream.50" border="none" borderRadius="lg" disabled opacity={0.7} />
                            </Box>
                        </VStack>
                    </HStack>
                </Box>

                {/* Account Security (Mock) */}
                <Box bg="white" p={8} borderRadius="2xl" borderWidth={1} borderColor="cream.300" shadow="sm">
                    <HStack gap={4} mb={6}>
                        <Box p={3} bg="cream.100" borderRadius="xl" color="bark.500">
                            <Shield size={24} />
                        </Box>
                        <Box>
                            <Heading fontSize="lg" color="bark.500">Security</Heading>
                            <Text fontSize="sm" color="bark.300">Password and authentication</Text>
                        </Box>
                    </HStack>
                    <Button variant="outline" borderColor="cream.300" color="bark.500" borderRadius="lg">
                        Change Password
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default SettingsPage;
