import React from 'react';

export default function OrientationPrompt() {
    return (
        <div
            className="fixed inset-x-0 bottom-6 z-[9999] flex justify-center px-4 pointer-events-none"
            style={{
                bottom: "max(24px, env(safe-area-inset-bottom))",
            }}
        >
            <div className="bg-[#f8f8f0] border-4 border-double border-zinc-800 rounded-lg p-4 shadow-lg text-zinc-900 relative">
                <h3 className="text-sm font-bold border-b-2 border-zinc-300 pb-2 mb-3 uppercase tracking-wider text-green-800">
                    🎮 Trainer Tips
                </h3>
                <p className="text-lg leading-relaxed mb-4">
                    For the best adventure, rotate your device to <span className="font-bold text-blue-700">Landscape Mode</span>.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    Movement controls will appear automatically.
                </p>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
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
