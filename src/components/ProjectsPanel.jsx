import React, { useState } from 'react';
import { projectsData } from '../data/projects.js';

export default function ProjectsPanel() {
    const [selectedId, setSelectedId] = useState(projectsData[0]?.id);
    const selectedProject = projectsData.find(p => p.id === selectedId);

    return (
        <div className="flex flex-col md:flex-row w-full h-full text-zinc-900 bg-[#f8f8f0] p-4 gap-4 font-pixel">
            {/* Left Panel: 30% */}
            <div className="w-full md:w-[30%] bg-red-50 border-4 border-double border-zinc-800 rounded-lg p-2 flex flex-col shadow-sm overflow-hidden">
                <h2 className="text-xs font-bold text-center bg-red-800 text-white p-2 rounded mb-2 uppercase border border-red-900">
                    Projects
                </h2>
                <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {projectsData.map((project) => (
                        <button
                            key={project.id}
                            onClick={() => setSelectedId(project.id)}
                            className={`w-full text-left p-2 text-[10px] border-2 rounded transition-colors ${selectedId === project.id
                                    ? 'bg-red-200 border-red-800 font-bold'
                                    : 'bg-white border-zinc-300 hover:bg-red-100 hover:border-red-400'
                                }`}
                        >
                            <span className="inline-block w-4 text-red-800">{selectedId === project.id ? '▶' : ''}</span>
                            {project.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Panel: 70% */}
            <div className="w-full md:w-[70%] bg-white border-4 border-double border-zinc-800 rounded-lg p-5 flex flex-col overflow-y-auto relative">
                {selectedProject ? (
                    <>
                        <div className="flex justify-between items-start border-b-2 border-red-800 pb-2 mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-red-900 uppercase mb-1">{selectedProject.title}</h3>
                                <span className="text-[10px] text-zinc-500 uppercase">{selectedProject.status}</span>
                            </div>
                            <div className="flex gap-2">
                                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="bg-zinc-800 text-white px-2 py-1 text-[10px] rounded border-2 border-zinc-900 hover:bg-zinc-700">GitHub</a>
                                {/* <a href={selectedProject.live} target="_blank" rel="noreferrer" className="bg-red-800 text-white px-2 py-1 text-[10px] rounded border-2 border-red-900 hover:bg-red-700">Live</a> */}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedProject.stack.map((tech, idx) => (
                                <span key={idx} className="bg-red-100 border border-red-800 text-red-900 px-2 py-1 text-[8px] uppercase rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="bg-zinc-100 border-2 border-zinc-300 rounded p-4 mb-4 font-sans text-sm text-zinc-800 leading-relaxed">
                            <p className="font-bold mb-2 font-pixel text-[10px] text-red-800 uppercase">Problem</p>
                            <p className="mb-4">{selectedProject.problem}</p>

                            <p className="font-bold mb-2 font-pixel text-[10px] text-red-800 uppercase">Solution</p>
                            <p>{selectedProject.solution}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-xs font-bold text-zinc-600 mb-2 uppercase">Key Features:</p>
                            <ul className="list-disc list-inside font-sans text-sm text-zinc-700 space-y-1">
                                {selectedProject.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-zinc-800 text-white p-3 rounded border-2 border-zinc-900 font-sans text-xs">
                            <p className="font-bold mb-1 font-pixel text-[10px] text-zinc-400">Architecture</p>
                            <p>{selectedProject.architecture}</p>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-400 text-xs">
                        Select a project from the list.
                    </div>
                )}
            </div>
        </div>
    );
}
