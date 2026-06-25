import React from 'react'

function Collider({ id, top, left, width, height, message, debug = false }) {
    return (
        <div
            style={{ top, left, width, height }}
            className="absolute pointer-events-none"
            // Custom attributes so your game loop can read them directly from the DOM later
            data-collider-id={id}
            data-message={message}
        >
            {/* 
        DEBUG MODE: Set debug={true} while developing to visually 
        see your invisible walls. Switch to false to hide them.
      */}
            {debug && (
                <div className="w-full h-full bg-red-500/30 border border-red-600 flex items-center justify-center text-[10px] text-white font-bold overflow-hidden">
                    {id}
                </div>
            )}
        </div>
    )
}

export default Collider
