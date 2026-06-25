import React from 'react'

function MapRegion({ top, left, width, children, onClick, onPlayerEnter }) {
    return (
        <div
            style={{ top, left, width }}
            className="absolute aspect-square group flex items-center justify-center cursor-pointer"
            onClick={onClick}
            role={onClick ? "button" : undefined}
            aria-label={onClick ? "Open region modal" : undefined}
        >
            {/* 1. THE BOUNDARY: Perfectly circular hit area */}
            <div className="absolute inset-0 bg-red-500/0 rounded-full transition-all group-hover:bg-red-500/20" />

            {/* 2. THE BUILDING: Rendered cleanly inside or on top of the boundary */}
            <div className="relative z-10 w-[75%] h-[75%] flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default MapRegion
