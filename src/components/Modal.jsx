import React from 'react'

function Modal({ isOpen, onClose, title, leftContent, rightContent }) {
    if (!isOpen) return null;

    return (
        /* The dark backdrop layout layer */
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm select-none">

            {/* Central Card Container */}
            <div className="bg-zinc-900 border border-zinc-700 w-full max-w-4xl h-[500px] rounded-2xl overflow-hidden shadow-2xl flex flex-col relative animate-fade-in text-white">

                {/* Header Title Bar */}
                <div className="p-4 border-b border-zinc-700 flex justify-between items-center bg-zinc-950">
                    <h2 className="text-lg font-bold tracking-wider uppercase text-emerald-400">{title}</h2>
                    <button
                        onClick={onClose}
                        className="bg-zinc-800 hover:bg-red-600 border border-zinc-600 px-3 py-1 rounded-lg text-sm transition-colors duration-150 font-bold"
                    >
                        ESC / CLOSE
                    </button>
                </div>

                {/* --- MAIN CONTENT AREA SPLIT (LEFT AND RIGHT) --- */}
                <div className="flex flex-1 min-h-0">

                    {/* Left Block Side */}
                    <div className="w-1/2 border-r border-zinc-700 bg-zinc-950 flex items-center justify-center p-6 overflow-y-auto">
                        {leftContent}
                    </div>

                    {/* Right Block Side */}
                    <div className="w-1/2 bg-zinc-900/40 p-6 overflow-y-auto">
                        {rightContent}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Modal
