// src/app/pages/auth/login/page.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, VStack, Heading, Text, Input, Button, Container, HStack } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import LoginSchema, { type LoginFormData } from "@schemas/auth/login.schema";
import { AuthService } from "@services/auth.service";
import { toaster } from "@components/ui/toaster";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
    });

    const onLoginSubmit = async (data: LoginFormData) => {
        setLoading(true);
        try {
            await AuthService.login(data);
            toaster.create({ title: "Welcome back!", type: "success" });
            navigate("/dashboard");
        } catch (error) {
            toaster.create({ title: "Login Failed", description: error instanceof Error ? error.message : "Invalid credentials", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box minH="100vh" bg="cream.100" py={{ base: 10, md: 20 }} px={4} display="flex" justifyContent="center" alignItems="center">
            <Container maxW="md" bg="white" p={{ base: 6, md: 10 }} borderRadius="2xl" boxShadow={{ base: "md", md: "xl" }}>
                <VStack gap={6} as="form" onSubmit={handleSubmit(onLoginSubmit)}>
                    <Heading size="md" color="bark.500">Welcome Back</Heading>
                    <Text color="gray.500">Login to continue to your dashboard.</Text>

                    <Box w="full">
                        <Input placeholder="Email" ps={4} {...register("email")} />
                        <Text color="red.500" fontSize="xs" mt={1}>{errors.email?.message}</Text>
                    </Box>

                    <Box w="full">
                        <Input type="password" placeholder="Password" ps={4} {...register("password")} />
                        <Text color="red.500" fontSize="xs" mt={1}>{errors.password?.message}</Text>
                    </Box>

                    <Button type="submit" bg="bronze.500" color="white" w="full" loading={loading}>
                        Login
                    </Button>

                    <Button
                        variant="outline"
                        borderColor="cream.400"
                        color="bark.400"
                        w="full"
                        onClick={() => AuthService.signInWithGoogle()}
                    >
                        <HStack gap={2}>
                            <FcGoogle size={20} />
                            <Text>Continue with Google</Text>
                        </HStack>
                    </Button>

                    <Text fontSize="sm" color="gray.500">
                        Don't have an account? <Link to="/auth/signup" style={{ color: "var(--chakra-colors-bronze-500)", fontWeight: "bold" }}>Sign up</Link>
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
};

export default LoginPage;