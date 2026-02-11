// @pages/auth/signup/page.tsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, VStack, Heading, Text, Input, Button, Container, HStack } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import SignupSchema, { type SignupFormData } from "@schemas/auth/signup.schema";
import { AuthService } from "@services/auth.service";
import { toaster } from "@components/ui/toaster";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const SignupPage = () => {
    const [step, setStep] = useState(1); // 1: Info, 2: Verification
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
    });

    // Step 1: Submit initial registration
    const onSignupSubmit = async (data: SignupFormData) => {
        setLoading(true);
        try {
            await AuthService.signup(data);
            setUserEmail(data.email);
            setStep(2); // Move to OTP step
            toaster.create({ title: "Check your email!", description: "We sent a code to " + data.email, type: "success" });
        } catch (error) {
            toaster.create({ title: "Signup Failed", description: error instanceof Error ? error.message : "An error occurred", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Submit the 6-digit code
    const onVerifyOTP = async (e: React.FormEvent<HTMLFormElement | HTMLDivElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const code = formData.get("otp") as string;

        setLoading(true);
        try {
            await AuthService.verifyOTP(userEmail, code);
            toaster.create({ title: "Account Verified!", type: "success" });
            navigate("/dashboard"); // Take them to their private dashboard
        } catch (error) {
            toaster.create({ title: "Invalid Code", description: error instanceof Error ? error.message : "Verification failed", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box minH="100vh" bg="cream.100" py={{ base: 10, md: 20 }} px={4} display="flex" justifyContent="center" alignItems="center">
            <Container maxW="md" bg="white" p={{ base: 6, md: 10 }} borderRadius="2xl" boxShadow={{ base: "md", md: "xl" }}>
                {step === 1 ? (
                    <VStack gap={6} as="form" onSubmit={handleSubmit(onSignupSubmit)}>
                        <Heading color="bark.500">Join NicheAI</Heading>
                        <Text color="gray.500" textAlign="center">Create your account to access your creative dashboard.</Text>

                        <Input placeholder="Full Name" ps={4} {...register("name")} />
                        <Text color="red.500" fontSize="xs">{errors.name?.message}</Text>

                        <Input placeholder="Email Address" ps={4} {...register("email")} />
                        <Text color="red.500" fontSize="xs">{errors.email?.message}</Text>

                        <Box w="full">
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <PhoneInput
                                        placeholder="Enter phone number"
                                        value={field.value}
                                        onChange={field.onChange}
                                        defaultCountry="NG"
                                        className="chakra-input"
                                        style={{
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '1px solid #E2E8F0',
                                            width: '100%',
                                            outline: 'none'
                                        }}
                                    />
                                )}
                            />
                            <Text color="red.500" fontSize="xs" mt={1}>{errors.phone?.message}</Text>
                        </Box>

                        <Input type="password" placeholder="Password" ps={4} {...register("password")} />
                        <Text color="red.500" fontSize="xs">{errors.password?.message}</Text>

                        <Button type="submit" bg="bronze.500" color="white" w="full" loading={loading}>
                            Create Account
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
                            Already have an account? <Link to="/auth/login" style={{ color: "var(--chakra-colors-bronze-500)", fontWeight: "bold" }}>Log in</Link>
                        </Text>
                    </VStack>
                ) : (
                    <Box as="form" onSubmit={onVerifyOTP}>
                        <VStack gap={6}>
                            <Heading color="bark.500">Verify Email</Heading>
                            <Text color="gray.500" textAlign="center">Enter the 6-digit code sent to {userEmail}</Text>

                            <Input name="otp" placeholder="000000" textAlign="center" fontSize="2xl" letterSpacing="widest" maxLength={6} required />

                            <Button type="submit" bg="bronze.500" color="white" w="full" loading={loading}>
                                Verify & Enter Dashboard
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Back to Signup</Button>
                        </VStack>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default SignupPage;