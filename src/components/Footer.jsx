import React from 'react';
import FooterActionButton from './FooterActionButton.jsx';
import { contact } from '../data/contact.js';
import squirtleImg from '../assets/Squirtle.png';
import cdImg from '../assets/cd.png';
import useBackgroundMusic from '../hooks/useBackgroundMusic.js';

function Footer() {
    const { isPlaying, toggleMusic } = useBackgroundMusic();

    return (
        <footer className="fixed bottom-4 left-0 z-[100] pointer-events-none" style={{ width: '70%' }}>
            <div className="relative flex items-center w-full  pr-2">

                {/* Left — Squirtle (overlaps the bar from the left) */}
                <div className="pointer-events-auto flex-shrink-0 relative z-10 -mr-4">
                    <img
                        src={squirtleImg}
                        alt="Squirtle"
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-lg"
                    />
                </div>

                {/* Gray bar container */}
                <div className="flex-1 bg-gray-400/70 backdrop-blur-sm rounded-2xl border border-gray-300/50 shadow-lg flex items-center justify-between py-4 px-6 sm:px-10">

                    {/* Center — Action Buttons */}
                    <div className="pointer-events-auto flex items-center gap-3 sm:gap-6 flex-1 justify-center">
                        <FooterActionButton
                            label="Resume"
                            href={contact.resume}
                            download={true}
                        />
                        <FooterActionButton
                            label="LinkedIn"
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                        <FooterActionButton
                            label="GitHub"
                            href={contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    </div>

                    {/* Right — CD */}
                    <button
                        type="button"
                        onClick={toggleMusic}
                        className="pointer-events-auto flex-shrink-0 ml-4 cursor-pointer rounded-full border-0 bg-transparent p-0"
                        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
                    >
                        <img
                            src={cdImg}
                            alt="CD"
                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg"
                            style={{ animation: isPlaying ? 'spin 3s linear infinite' : 'none' }}
                        />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
