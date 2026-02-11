import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } }
};

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

export const float: Variants = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity
        }
    }
};

export const scaleIn: Variants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};
