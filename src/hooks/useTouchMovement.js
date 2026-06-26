import { useCallback } from 'react';

export function useTouchMovement(onPress, onRelease) {
    const handleTouchStart = useCallback((direction) => (e) => {
        // Prevent default browser behaviors like scrolling, zooming, or pull-to-refresh
        if (e.cancelable) {
            e.preventDefault();
        }
        onPress(direction);
    }, [onPress]);

    const handleTouchEnd = useCallback((direction) => (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        onRelease(direction);
    }, [onRelease]);

    const handleTouchCancel = useCallback((direction) => (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        onRelease(direction);
    }, [onRelease]);

    return {
        handleTouchStart,
        handleTouchEnd,
        handleTouchCancel
    };
}
