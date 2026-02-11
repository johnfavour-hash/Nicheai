import { Route, Routes, BrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import RootLayout from "@app/layouts/layout";
import DashboardLayout from "@app/layouts/dashboard/layout";
import { Box, Spinner } from "@chakra-ui/react";
import ProtectedRoute from "@components/ProtectedRoute";

// Lazy Pages
const LandingPage = lazy(() => import("@pages/landing/page"));
const DashboardPage = lazy(() => import("@pages/dashboard/page"));
const GeneratorPage = lazy(() => import("@pages/dashboard/generator/page"));
const SettingsPage = lazy(() => import("@pages/dashboard/settings/page"));
const WorkspacePage = lazy(() => import("@pages/dashboard/workspace/page"));
const AnalyticsPage = lazy(() => import("@pages/dashboard/analytics/page"));
const StrategyPage = lazy(() => import("@pages/dashboard/strategy/page"));
const TrendsPage = lazy(() => import("@pages/dashboard/trends/page"));
const LoginPage = lazy(() => import("@pages/auth/login/page"));
const SignupPage = lazy(() => import("@pages/auth/signup/page"));
const MonetizationPage = lazy(() => import("@pages/dashboard/monetization/page"));
const CommunityPage = lazy(() => import("@pages/dashboard/community/page"));
const OperationsPage = lazy(() => import("@pages/dashboard/operations/page"));
const IntegrationsPage = lazy(() => import("@pages/dashboard/integrations/page"));
const BrandPage = lazy(() => import("@pages/dashboard/brand/page"));
const SpyPage = lazy(() => import("@pages/dashboard/spy/page"));
const HelpPage = lazy(() => import("@pages/dashboard/help/page"));
const TeleprompterPage = lazy(() => import("@pages/dashboard/teleprompter/page"));
const AssetsPage = lazy(() => import("../app/pages/dashboard/assets/page"));

const LoadingFallback = () => (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="cream.100">
        <Spinner size="xl" color="bronze.500" />
    </Box>
);

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Landing context */}
                <Route path="/" element={<RootLayout />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<LoadingFallback />}>
                                <LandingPage />
                            </Suspense>
                        }
                    />
                    <Route path="about" element={<p>About</p>} />
                    <Route path="contact" element={<p>Contact</p>} />
                </Route>

                {/* Auth context */}
                <Route path="/auth" element={<RootLayout />}>
                    <Route
                        path="login"
                        element={
                            <Suspense fallback={<LoadingFallback />}>
                                <LoginPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="signup"
                        element={
                            <Suspense fallback={<LoadingFallback />}>
                                <SignupPage />
                            </Suspense>
                        }
                    />
                    <Route path="forgot-password" element={<p>Forgot Password</p>} />
                </Route>

                {/* Dashboard context */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route
                            index
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <DashboardPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="generator"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <GeneratorPage />
                                </Suspense>
                            }
                        />
                        {/* Placeholder routes for nested navigation */}
                        <Route
                            path="workspace"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <WorkspacePage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="strategy"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <StrategyPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="trends"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <TrendsPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="analytics"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <AnalyticsPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="assets"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <AssetsPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="monetization"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <MonetizationPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="community"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <CommunityPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="operations"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <OperationsPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="integrations"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <IntegrationsPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="brand"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <BrandPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="spy"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <SpyPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="help"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <HelpPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="settings"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <SettingsPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="teleprompter"
                            element={
                                <Suspense fallback={<LoadingFallback />}>
                                    <TeleprompterPage />
                                </Suspense>
                            }
                        />
                    </Route>
                </Route>

                {/* Profile context */}
                <Route path="/profile" element={<p>Profile</p>} />
                <Route path="/profile/:id/edit" element={<p>Edit Profile</p>} />

                {/* Fallback */}
                <Route path="*" element={<p>404 Not Found</p>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;