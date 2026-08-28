// Reusable animation variants for Framer Motion
export const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export const fadeInDown = {
    hidden: {
        opacity: 0,
        y: -30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export const fadeInLeft = {
    hidden: {
        opacity: 0,
        x: -40,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export const fadeInRight = {
    hidden: {
        opacity: 0,
        x: 40,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export const slideInUp = {
    hidden: {
        opacity: 0,
        y: 60,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const staggerContainerFast = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const hoverScaleUp = {
    whileHover: {
        scale: 1.05,
        transition: { duration: 0.3 },
    },
};

export const hoverGlow = {
    whileHover: {
        boxShadow: "0 0 30px rgba(0, 128, 255, 0.5)",
        transition: { duration: 0.3 },
    },
};

export const tapScale = {
    whileTap: {
        scale: 0.95,
    },
};

export const rotateIn = {
    hidden: {
        opacity: 0,
        rotate: -10,
    },
    visible: {
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export const expandWidth = {
    hidden: {
        width: 0,
        opacity: 0,
    },
    visible: {
        width: "auto",
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
};

export const floatingAnimation = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export const pulseGlow = {
    animate: {
        boxShadow: [
            "0 0 10px rgba(0, 128, 255, 0.4)",
            "0 0 30px rgba(0, 128, 255, 0.6)",
            "0 0 10px rgba(0, 128, 255, 0.4)",
        ],
    },
    transition: {
        duration: 2,
        repeat: Infinity,
    },
};

export const shimmer = {
    animate: {
        backgroundPosition: ["200% center", "-200% center"],
    },
    transition: {
        duration: 2,
        repeat: Infinity,
    },
};
