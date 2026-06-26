import React from 'react';
import { aboutData } from '../data/about.js';
import { trainerData } from '../data/trainer.js';

export default function AboutPanel() {
    return (
        <div className="flex flex-col md:flex-row w-full h-full text-zinc-900 bg-[#f8f8f0] p-4 gap-4 font-pixel">
            {/* Left Panel: 30% */}
            <div className="w-full md:w-[30%] bg-white border-4 border-double border-zinc-800 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <div className="w-24 h-24 bg-zinc-200 border-2 border-zinc-700 rounded mb-4 flex items-center justify-center text-4xl">
                    👦🏻
                </div>
                <div className="text-center mb-6">
                    <p className="text-xs text-zinc-500 mb-1">{trainerData.class}</p>
                    <h2 className="text-lg font-bold text-green-700">{trainerData.name}</h2>
                    <p className="text-xs mt-1 text-zinc-600">{trainerData.role}</p>
                </div>

                <div className="w-full bg-green-50 border-2 border-green-800 rounded p-2 text-xs">
                    <p className="font-bold text-green-900 mb-1">MISSION</p>
                    <p className="text-green-800 leading-tight">{trainerData.mission}</p>
                </div>

                <div className="mt-auto w-full space-y-2 text-xs">
                    <div className="flex justify-between border-b border-zinc-300 pb-1">
                        <span>MONEY</span>
                        <span>${trainerData.money}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-300 pb-1">
                        <span>POKéDEX</span>
                        <span>{trainerData.pokedex}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                        <span>TIME</span>
                        <span>{trainerData.playTime}</span>
                    </div>
                </div>
            </div>

            {/* Right Panel: 70% */}
            <div className="w-full md:w-[70%] bg-white border-4 border-double border-zinc-800 rounded-lg p-5 flex flex-col overflow-y-auto">
                <div className="mb-6">
                    <h3 className="text-sm font-bold border-b-2 border-green-800 pb-1 mb-3 text-green-800 uppercase">Trainer Info</h3>
                    <p className="text-xs leading-relaxed mb-4 font-sans font-medium text-zinc-700">
                        {aboutData.bio}
                    </p>
                </div>
                
                <div className="mb-6">
                    <h3 className="text-sm font-bold border-b-2 border-green-800 pb-1 mb-3 text-green-800 uppercase">Education</h3>
                    <div className="bg-zinc-100 p-3 border-2 border-zinc-300 rounded mb-2">
                        <p className="font-bold text-xs">{aboutData.college.name}</p>
                        <p className="text-[10px] text-zinc-600 mt-1">{aboutData.college.degree}</p>
                        <p className="text-[10px] text-zinc-600">{aboutData.college.details}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-bold border-b-2 border-green-800 pb-1 mb-3 text-green-800 uppercase">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                        {aboutData.interests.map((interest, idx) => (
                            <span key={idx} className="bg-green-100 border border-green-700 text-green-900 px-2 py-1 text-[10px] uppercase rounded">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
