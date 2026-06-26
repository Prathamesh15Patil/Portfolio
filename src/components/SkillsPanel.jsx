import React, { useState } from 'react';
import { skillsData } from '../data/skills.js';

export default function SkillsPanel() {
    const [selectedId, setSelectedId] = useState(skillsData[0]?.id);
    const selectedSkill = skillsData.find(s => s.id === selectedId);

    return (
        <div className="flex flex-col md:flex-row w-full h-full text-zinc-900 bg-[#f8f8f0] p-4 gap-4 font-pixel">
            {/* Left Panel: 30% */}
            <div className="w-full md:w-[30%] bg-blue-50 border-4 border-double border-zinc-800 rounded-lg p-2 flex flex-col shadow-sm overflow-hidden">
                <h2 className="text-xs font-bold text-center bg-blue-800 text-white p-2 rounded mb-2 uppercase border border-blue-900">
                    TechDex
                </h2>
                <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {skillsData.map((skill) => (
                        <button
                            key={skill.id}
                            onClick={() => setSelectedId(skill.id)}
                            className={`w-full text-left p-2 text-[10px] border-2 rounded transition-colors ${
                                selectedId === skill.id 
                                ? 'bg-blue-200 border-blue-800 font-bold' 
                                : 'bg-white border-zinc-300 hover:bg-blue-100 hover:border-blue-400'
                            }`}
                        >
                            <span className="inline-block w-4">{selectedId === skill.id ? '▶' : ''}</span>
                            {skill.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Panel: 70% */}
            <div className="w-full md:w-[70%] bg-white border-4 border-double border-zinc-800 rounded-lg p-5 flex flex-col overflow-y-auto">
                {selectedSkill ? (
                    <>
                        <div className="flex justify-between items-end border-b-2 border-blue-800 pb-2 mb-4">
                            <h3 className="text-lg font-bold text-blue-900 uppercase">{selectedSkill.name}</h3>
                            <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded border border-blue-300">
                                {selectedSkill.category}
                            </span>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-xs font-bold text-zinc-600 mb-1">Proficiency:</p>
                            <p className="text-sm text-blue-800">{selectedSkill.experience}</p>
                        </div>

                        <div className="bg-zinc-100 border-2 border-zinc-300 rounded p-4 mb-4 font-sans text-sm text-zinc-800 leading-relaxed">
                            <p className="font-bold mb-2 font-pixel text-[10px]">DESCRIPTION</p>
                            <p className="mb-4">{selectedSkill.description}</p>
                            
                            <p className="font-bold mb-2 font-pixel text-[10px]">WHY I USE IT</p>
                            <p>{selectedSkill.whyIUseIt}</p>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-zinc-600 mb-2 uppercase">Used In Projects:</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedSkill.usedIn.map((project, idx) => (
                                    <span key={idx} className="bg-white border border-zinc-400 px-2 py-1 text-[10px] rounded shadow-sm">
                                        {project}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-400 text-xs">
                        Select a technology from the list.
                    </div>
                )}
            </div>
        </div>
    );
}
