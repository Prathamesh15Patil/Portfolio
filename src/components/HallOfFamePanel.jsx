import React, { useState } from 'react';
import { achievementsData } from '../data/achievements.js';

export default function HallOfFamePanel() {
    const [selectedId, setSelectedId] = useState(achievementsData[0]?.id);
    const selectedAchievement = achievementsData.find(a => a.id === selectedId);

    return (
        <div className="flex flex-col md:flex-row w-full h-full text-zinc-900 bg-[#f8f8f0] p-4 gap-4 font-pixel">
            {/* Left Panel: 30% */}
            <div className="w-full md:w-[30%] bg-yellow-50 border-4 border-double border-zinc-800 rounded-lg p-2 flex flex-col shadow-sm overflow-hidden">
                <h2 className="text-xs font-bold text-center bg-yellow-600 text-white p-2 rounded mb-2 uppercase border border-yellow-800">
                    Victories
                </h2>
                <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {achievementsData.map((achievement) => (
                        <button
                            key={achievement.id}
                            onClick={() => setSelectedId(achievement.id)}
                            className={`w-full flex items-center p-2 text-[10px] border-2 rounded transition-colors text-left ${
                                selectedId === achievement.id 
                                ? 'bg-yellow-200 border-yellow-600 font-bold' 
                                : 'bg-white border-zinc-300 hover:bg-yellow-100 hover:border-yellow-400'
                            }`}
                        >
                            <span className="text-lg mr-2">{achievement.icon}</span>
                            <span className="truncate">{achievement.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Panel: 70% */}
            <div className="w-full md:w-[70%] bg-white border-4 border-double border-zinc-800 rounded-lg p-5 flex flex-col overflow-y-auto relative">
                {selectedAchievement ? (
                    <>
                        <div className="flex flex-col items-center justify-center border-b-4 border-double border-yellow-600 pb-4 mb-6">
                            <div className="text-5xl mb-2">{selectedAchievement.icon}</div>
                            <h3 className="text-xl font-bold text-yellow-700 uppercase text-center">{selectedAchievement.title}</h3>
                            <div className="flex gap-4 mt-2 text-xs text-zinc-600 font-bold uppercase">
                                <span>{selectedAchievement.event}</span>
                                <span>|</span>
                                <span>{selectedAchievement.date}</span>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-2 border-yellow-600 rounded-lg p-4 mb-6 text-center shadow-sm">
                            <p className="text-lg font-bold text-yellow-800 uppercase animate-pulse">{selectedAchievement.position}</p>
                        </div>

                        <div className="mb-6 font-sans text-sm text-zinc-700 leading-relaxed text-center px-4">
                            <p>{selectedAchievement.description}</p>
                        </div>

                        <div className="mt-auto">
                            <p className="text-xs font-bold text-zinc-500 mb-3 uppercase text-center border-b border-zinc-200 pb-1">Skills Demonstrated</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {selectedAchievement.skills.map((skill, idx) => (
                                    <span key={idx} className="bg-zinc-800 text-yellow-400 px-3 py-1 text-[10px] uppercase rounded-full border border-zinc-900">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-400 text-xs">
                        Select an achievement to view details.
                    </div>
                )}
            </div>
        </div>
    );
}
