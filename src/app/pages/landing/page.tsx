import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Stats from "./components/Stats";
import Marquee from "./components/Marquee";
import Pricing from "./components/Pricing";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const LandingPage = () => {
    return (
        <Box>
            <Navbar />
            <main>
                <Hero />
                <Services />
                <About />
                <Stats />
                <Marquee />
                <Pricing />
                <ContactSection />
            </main>
            <Footer />
        </Box>
    );
};

export default LandingPage;
