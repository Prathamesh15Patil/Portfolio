import React from 'react'
import bubblePng from "../assets/message_box/messageBox1.png";

function SpeechBubble({ message }) {
    if (!message) return null;

    return (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 animate-bounce-short select-none pointer-events-none">
            <div className="relative flex items-center justify-center min-w-[150px] min-h-[30px] max-w-[200px]">

                {/* Your custom PNG Image Background */}
                <img
                    src={bubblePng}
                    alt="speech bubble background"
                    className="absolute inset-0 w-full h-auto object-fill drop-shadow-lg"
                />

                {/* The message text inside the box padding layout */}
                <span className="relative z-10 px-4 py-10 text-[13px] text-zinc-900 font-bold text-center leading-tight break-words uppercase tracking-wide">
                    {message}
                </span>
            </div>
        </div>
    )
}

export default SpeechBubble
