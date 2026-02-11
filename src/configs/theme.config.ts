import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    globalCss: {
        "html, body": {
            fontFamily: "Inter, sans-serif",
        },
        body: {
            backgroundColor: "{colors.cream.50}",
            color: "{colors.bark.500}",
            _dark: {
                backgroundColor: "{colors.bark.500}",
                color: "{colors.cream.50}",
            },
        },
    },
    theme: {
        tokens: {
            colors: {
                // Autumn Color Palette
                bark: {
                    50: { value: "#F5F3F0" },
                    100: { value: "#E8E4DC" },
                    200: { value: "#D1C9BA" },
                    300: { value: "#A89878" },
                    400: { value: "#5C4A1E" },
                    500: { value: "#2E2300" }, // Primary dark
                    600: { value: "#251C00" },
                    700: { value: "#1C1500" },
                    800: { value: "#130E00" },
                    900: { value: "#0A0700" },
                },
                seaweed: {
                    50: { value: "#F7F8EF" },
                    100: { value: "#EBECD5" },
                    200: { value: "#D8DBAB" },
                    300: { value: "#B5BB6B" },
                    400: { value: "#8E9334" },
                    500: { value: "#6E6702" }, // Secondary accent
                    600: { value: "#585202" },
                    700: { value: "#423E01" },
                    800: { value: "#2C2901" },
                    900: { value: "#161500" },
                },
                bronze: {
                    50: { value: "#FEF6F0" },
                    100: { value: "#FDE8D8" },
                    200: { value: "#FBCFB0" },
                    300: { value: "#F7A66D" },
                    400: { value: "#E17A2E" },
                    500: { value: "#C05805" }, // Primary action
                    600: { value: "#9A4604" },
                    700: { value: "#733503" },
                    800: { value: "#4D2302" },
                    900: { value: "#261201" },
                },
                goldenrod: {
                    50: { value: "#FFFCF0" },
                    100: { value: "#FEF4D4" },
                    200: { value: "#FDE6A8" },
                    300: { value: "#FBCE5C" },
                    400: { value: "#E5A82B" },
                    500: { value: "#DB9501" }, // Highlight
                    600: { value: "#AF7701" },
                    700: { value: "#835901" },
                    800: { value: "#583C00" },
                    900: { value: "#2C1E00" },
                },
                cream: {
                    50: { value: "#FFFDFB" },
                    100: { value: "#FBF9F6" }, // Page background
                    200: { value: "#F4F2EF" }, // Card background
                    300: { value: "#E8E5E0" },
                    400: { value: "#D4D0C8" },
                    500: { value: "#B8B3A8" },
                },
            },
            fonts: {
                heading: { value: "'Inter', sans-serif" },
                body: { value: "'Inter', sans-serif" },
            },
        },
        semanticTokens: {
            colors: {
                // Primary action color (Bronze)
                primary: {
                    solid: { value: "{colors.bronze.500}" },
                    muted: { value: "{colors.bronze.400}" },
                    subtle: { value: "{colors.bronze.100}" },
                    contrast: { value: "{colors.cream.50}" },
                    fg: { value: "{colors.bronze.600}" },
                    emphasized: { value: "{colors.bronze.700}" },
                    focusRing: { value: "{colors.bronze.500}" },
                },
                // Secondary (Goldenrod for highlights)
                secondary: {
                    solid: { value: "{colors.goldenrod.500}" },
                    muted: { value: "{colors.goldenrod.400}" },
                    subtle: { value: "{colors.goldenrod.100}" },
                    contrast: { value: "{colors.bark.500}" },
                    fg: { value: "{colors.goldenrod.600}" },
                },
                // Accent (Seaweed for subtle accents)
                accent: {
                    solid: { value: "{colors.seaweed.500}" },
                    muted: { value: "{colors.seaweed.400}" },
                    subtle: { value: "{colors.seaweed.100}" },
                    fg: { value: "{colors.seaweed.600}" },
                },
                // Backgrounds
                bg: {
                    DEFAULT: { value: "{colors.cream.100}" },
                    subtle: { value: "{colors.cream.200}" },
                    muted: { value: "{colors.cream.300}" },
                    emphasized: { value: "{colors.bark.500}" },
                    panel: { value: "{colors.cream.50}" },
                },
                // Border colors
                border: {
                    default: {
                        value: {
                            base: "{colors.cream.400}",
                            _dark: "{colors.bark.400}",
                        },
                    },
                },
            },
        },
    },
});

const themeSystem = createSystem(defaultConfig, config);
export default themeSystem;