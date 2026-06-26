import React from 'react';
import { useOrientation } from '../hooks/useOrientation.js';
import OrientationPrompt from './Mobile/OrientationPrompt.jsx';
import DPad from './Mobile/DPad.jsx';

function MobileControls({ onPress, onRelease }) {
    const { isMobile, isPortrait } = useOrientation();

    // If not on mobile, don't render any mobile controls/prompts
    if (!isMobile) return null;

    return (
        <>
            {isPortrait ? (
                <OrientationPrompt />
            ) : (
                <DPad onPress={onPress} onRelease={onRelease} />
            )}
        </>
    );
}

export default MobileControls;
