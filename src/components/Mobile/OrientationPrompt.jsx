import React from 'react';

export default function OrientationPrompt() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-sm font-pixel animate-slide-up-fade">
            <div className="bg-[#f8f8f0] border-4 border-double border-zinc-800 rounded-lg p-4 shadow-lg text-zinc-900 relative">
                <h3 className="text-sm font-bold border-b-2 border-zinc-300 pb-2 mb-3 uppercase tracking-wider text-green-800">
                    🎮 Trainer Tips
                </h3>
                <p className="text-xs leading-relaxed mb-4">
                    For the best adventure, rotate your device to <span className="font-bold text-blue-700">Landscape Mode</span>.
                </p>
                <p className="text-xs leading-relaxed mb-6">
                    Movement controls will appear automatically.
                </p>
                <div className="flex justify-end items-center">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest mr-2">Continue Anyway</span>
                    <div className="animate-bounce-right text-red-600 font-bold text-lg leading-none">
                        ▶
                    </div>
                </div>
            </div>
            {/* Inject a small style block for the slide-up-fade and bounce-right animations if not in tailwind config */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes slideUpFade {
                    from { transform: translate(-50%, 20px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
                .animate-slide-up-fade {
                    animation: slideUpFade 0.4s ease-out forwards;
                }
                @keyframes bounceRight {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(4px); }
                }
                .animate-bounce-right {
                    animation: bounceRight 1s infinite;
                }
            `}} />
        </div>
    );
}
