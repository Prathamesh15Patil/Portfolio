import React from 'react';
import AboutPanel from './AboutPanel.jsx';
import SkillsPanel from './SkillsPanel.jsx';
import ProjectsPanel from './ProjectsPanel.jsx';
import HallOfFamePanel from './HallOfFamePanel.jsx';

// Panel Registry
const panels = {
    about: AboutPanel,
    skills: SkillsPanel,
    projects: ProjectsPanel,
    fame: HallOfFamePanel,
};

function Modal({ isOpen, onClose, title, type, leftContent, rightContent }) {
    if (!isOpen) return null;

    const SelectedPanel = type && panels[type] ? panels[type] : null;

    return (
        /* The dark backdrop layout layer with blur */
        <div className="fixed inset-0 bg-black/60 z-[150] flex items-center justify-center p-2 sm:p-4 backdrop-blur-[2px] select-none font-pixel">

            {/* Central Card Container - FRLG Style */}
            <div className="bg-[#f8f8f0] border-4 border-zinc-800 w-full max-w-4xl h-[95vh] max-h-[500px] rounded-[4px] overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.5)] flex flex-col relative animate-fade-in text-zinc-900 transform scale-95 transition-transform duration-200" style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}>

                {/* Header Title Bar - Retro Style */}
                <div className="p-3 border-b-4 border-zinc-800 flex justify-between items-center bg-zinc-800 text-white">
                    <h2 className="text-sm font-bold tracking-wider uppercase ml-2 text-white shadow-sm">
                        {title}
                    </h2>
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="flex-1 min-h-0 bg-[#f8f8f0] p-1">
                    {SelectedPanel ? (
                        <SelectedPanel />
                    ) : (
                        /* Fallback for legacy props if type is missing */
                        <div className="flex w-full h-full">
                            <div className="w-1/2 border-r-4 border-zinc-800 flex items-center justify-center p-6 overflow-y-auto">
                                {leftContent}
                            </div>
                            <div className="w-1/2 p-6 overflow-y-auto">
                                {rightContent}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer - Exit Button */}
                <div className="p-2 border-t-4 border-zinc-800 bg-zinc-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-white hover:bg-zinc-100 border-2 border-zinc-800 px-4 py-2 rounded-[2px] text-xs font-bold text-zinc-800 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                    >
                        ◀ Exit Building
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Modal;
