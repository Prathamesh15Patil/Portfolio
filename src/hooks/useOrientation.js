import { useState, useEffect } from 'react';

export function useOrientation() {
    const [isMobile, setIsMobile] = useState(false);
    const [isPortrait, setIsPortrait] = useState(true);

    useEffect(() => {
        // Detect if the device relies primarily on touch (coarse pointer)
        // or check window width as a fallback.
        const checkIsMobile = () => {
            const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const isSmallScreen = window.innerWidth <= 1024;
            // Also checking touch events support for safety
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            return (hasCoarsePointer || isSmallScreen) && hasTouch;
        };

        const checkOrientation = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };

        const handleResize = () => {
            setIsMobile(checkIsMobile());
            checkOrientation();
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    return { isMobile, isPortrait };
}
