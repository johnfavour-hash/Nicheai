import RootLayout from "@app/layouts/layout";
import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"
import { Box, Spinner } from "@chakra-ui/react";

const LoginPage = lazy(() => import("@pages/auth/login/page"));
const SignupPage = lazy(() => import("@pages/auth/signup/page"));

const AuthRoutes = () => {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route
                    path="/auth/login"
                    element={
                        <Suspense fallback={
                            <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
                                <Spinner size="xl" color="bronze.500" />
                            </Box>
                        }>
                            <LoginPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/auth/signup"
                    element={
                        <Suspense fallback={
                            <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
                                <Spinner size="xl" color="bronze.500" />
                            </Box>
                        }>
                            <SignupPage />
                        </Suspense>
                    }
                />
                <Route path="/auth/forgot-password" element={<p>Forgot Password</p>} />
            </Route>
        </Routes>
    )
}

export default AuthRoutes