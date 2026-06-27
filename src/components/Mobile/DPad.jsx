import React, { useEffect } from 'react';
import { useTouchMovement } from '../../hooks/useTouchMovement.js';

export default function DPad({ onPress, onRelease }) {
    const { handleTouchStart, handleTouchEnd, handleTouchCancel } = useTouchMovement(onPress, onRelease);

    // Prevent default touch behaviors globally on the DPad wrapper to ensure no scrolling/zooming
    useEffect(() => {
        const preventDefault = (e) => e.preventDefault();
        const dpadElement = document.getElementById('gba-dpad');
        if (dpadElement) {
            dpadElement.addEventListener('touchmove', preventDefault, { passive: false });
        }
        return () => {
            if (dpadElement) {
                dpadElement.removeEventListener('touchmove', preventDefault);
            }
        };
    }, []);

    const dpadBtnClass = `
        absolute bg-[#e0e0d8] border-2 border-zinc-700 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.2),2px_2px_4px_rgba(0,0,0,0.3)]
        flex items-center justify-center text-zinc-700
        active:bg-[#d0d0c8] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)] active:scale-95 transition-all
        select-none touch-none w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
    `;

    // Inner cross size: 12x12
    // Center block size: 12x12
    // It's a cross layout

    return (
        <div
            id="gba-dpad"
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] animate-fade-in opacity-80 hover:opacity-100 select-none touch-none"
        >
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48">
                {/* Center Square (Visual only) */}
                <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-[#e0e0d8] border-none flex items-center justify-center shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.2)]">
                    <div className="w-1/3 h-1/3 bg-zinc-400 rounded-full opacity-50"></div>
                </div>

                {/* UP */}
                <button
                    className={`${dpadBtnClass} top-0 left-1/3 w-1/3 h-1/3 rounded-t-lg border-b-0`}
                    onTouchStart={handleTouchStart('up')}
                    onTouchEnd={handleTouchEnd('up')}
                    onTouchCancel={handleTouchCancel('up')}
                >
                    <span className="text-xl -mt-2">▲</span>
                </button>

                {/* DOWN */}
                <button
                    className={`${dpadBtnClass} bottom-0 left-1/3 w-1/3 h-1/3 rounded-b-lg border-t-0`}
                    onTouchStart={handleTouchStart('down')}
                    onTouchEnd={handleTouchEnd('down')}
                    onTouchCancel={handleTouchCancel('down')}
                >
                    <span className="text-xl mt-2">▼</span>
                </button>

                {/* LEFT */}
                <button
                    className={`${dpadBtnClass} top-1/3 left-0 w-1/3 h-1/3 rounded-l-lg border-r-0`}
                    onTouchStart={handleTouchStart('left')}
                    onTouchEnd={handleTouchEnd('left')}
                    onTouchCancel={handleTouchCancel('left')}
                >
                    <span className="text-xl -ml-2">◀</span>
                </button>

                {/* RIGHT */}
                <button
                    className={`${dpadBtnClass} top-1/3 right-0 w-1/3 h-1/3 rounded-r-lg border-l-0`}
                    onTouchStart={handleTouchStart('right')}
                    onTouchEnd={handleTouchEnd('right')}
                    onTouchCancel={handleTouchCancel('right')}
                >
                    <span className="text-xl ml-2">▶</span>
                </button>
            </div>
        </div>
    );
}
