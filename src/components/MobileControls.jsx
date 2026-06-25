import React from 'react';

function MobileControls({ onPress, onRelease }) {
    const controlClass = "w-16 h-16 rounded-3xl bg-zinc-900/95 border border-zinc-700 text-white text-lg font-semibold shadow-2xl shadow-black/20 active:bg-emerald-500/80 transition-colors touch-none";

    return (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:hidden">
            <div className="grid grid-cols-3 gap-3 px-1 py-2 bg-zinc-950/95 border border-zinc-700 rounded-3xl shadow-2xl shadow-black/40">
                <button
                    type="button"
                    className={`${controlClass} col-span-3 text-xl`}
                    onPointerDown={() => onPress('up')}
                    onPointerUp={() => onRelease('up')}
                    onPointerLeave={() => onRelease('up')}
                    onPointerCancel={() => onRelease('up')}
                >
                    ↑
                </button>
                <button
                    type="button"
                    className={`${controlClass}`}
                    onPointerDown={() => onPress('left')}
                    onPointerUp={() => onRelease('left')}
                    onPointerLeave={() => onRelease('left')}
                    onPointerCancel={() => onRelease('left')}
                >
                    ←
                </button>
                <button
                    type="button"
                    className={`${controlClass}`}
                    onPointerDown={() => onPress('down')}
                    onPointerUp={() => onRelease('down')}
                    onPointerLeave={() => onRelease('down')}
                    onPointerCancel={() => onRelease('down')}
                >
                    ↓
                </button>
                <button
                    type="button"
                    className={`${controlClass}`}
                    onPointerDown={() => onPress('right')}
                    onPointerUp={() => onRelease('right')}
                    onPointerLeave={() => onRelease('right')}
                    onPointerCancel={() => onRelease('right')}
                >
                    →
                </button>
            </div>
        </div>
    );
}

export default MobileControls;
