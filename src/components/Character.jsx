import React from 'react';
import SpeechBubble from "./SpeechBubble.jsx";

import d1 from "../assets/character/walk-down/w1.1.png";
import d2 from "../assets/character/walk-down/w1.2.png";
import d3 from "../assets/character/walk-down/w1.3.png";
import d4 from "../assets/character/walk-down/w1.4.png";
import d5 from "../assets/character/walk-down/w1.5.png";
import d6 from "../assets/character/walk-down/w1.6.png";

import u1 from "../assets/character/walk-up/wu1.png";
import u2 from "../assets/character/walk-up/wu2.png";
import u3 from "../assets/character/walk-up/wu3.png";
import u4 from "../assets/character/walk-up/wu4.png";
import u5 from "../assets/character/walk-up/wu5.png";
import u6 from "../assets/character/walk-up/wu6.png";

import l1 from "../assets/character/walk-left/l1.png";
import l2 from "../assets/character/walk-left/l2.png";
import l3 from "../assets/character/walk-left/l3.png";
import l4 from "../assets/character/walk-left/l4.png";
import l5 from "../assets/character/walk-left/l5.png";
import l6 from "../assets/character/walk-left/l6.png";

import r1 from "../assets/character/walk-right/r1.png";
import r2 from "../assets/character/walk-right/r2.png";
import r3 from "../assets/character/walk-right/r3.png";
import r4 from "../assets/character/walk-right/r4.png";
import r5 from "../assets/character/walk-right/r5.png";
import r6 from "../assets/character/walk-right/r6.png";

// A helper object mapping your 6-frame arrays to their direction strings
// Replace these placeholders with your actual asset imports!
const CHARACTER_SPRITES = {
    down: [d1, d2, d3, d5, d6],
    up: [u1, u2, u3, u4, u5, u6],
    left: [l1, l2, l3, l4, l5, l6],
    right: [r1, r2, r3, r4, r5, r6]
};

function Character({ posX, posY, direction, currentFrame, message }) {
    // Safe fallback if an image is missing during setup
    const currentSprite = CHARACTER_SPRITES[direction]?.[currentFrame] || CHARACTER_SPRITES.down[0];

    return (
        <div
            style={{
                top: `${posY}%`,
                left: `${posX}%`,
                transform: 'translate(-50%, -100%)' // Anchors positioning to the character's feet
            }}
            className="absolute z-20 w-[3.5%] transition-all duration-75 ease-linear pointer-events-none"
        >

            {/* NEW: Speech bubble sits smoothly above the asset sprite */}
            <SpeechBubble message={message} />

            {/* If your sprites are transparent PNGs, object-contain is perfect */}
            <img
                src={currentSprite}
                alt={`character-${direction}`}
                className="w-full h-auto object-contain"
            />
        </div>
    );
}

export default Character;
