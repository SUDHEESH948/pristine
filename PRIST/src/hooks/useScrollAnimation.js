import { useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";

export const useScrollAnimation = () => {
    const ref = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start("visible");
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls]);

    return { ref, controls };
};

export const useScrollIntoView = (options = {}) => {
    const ref = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start("visible");
                }
            },
            {
                threshold: options.threshold || 0.15,
                rootMargin: options.rootMargin || "0px 0px -100px 0px",
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls, options.threshold, options.rootMargin]);

    return { ref, controls };
};

export const useParallaxScroll = (offset = 0.5) => {
    const ref = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
        let animationId;

        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const distanceFromBottom = windowHeight - rect.top;
                const parallaxOffset = distanceFromBottom * offset;

                controls.set({ y: parallaxOffset });
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls, offset]);

    return { ref, controls };
};
