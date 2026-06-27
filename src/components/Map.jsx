import React from 'react'
import { useState, useEffect, useRef } from 'react';
import mapImage from "../assets/map.jpg"
import MapRegion from "../components/MapRegion.jsx"
import NamePlate from "../components/NamePlate.jsx"
import houseImage from "../assets/buildings/house.png"
import skillsImage from "../assets/buildings/training.png"
import hallOfFameImage from "../assets/buildings/hall_of_fame.png"
import projectsImage from "../assets/buildings/gym1.png"
import Collider from "../components/Collider.jsx"
import Character from "../components/Character.jsx"
import Modal from "./Modal.jsx";
import MobileControls from "../components/MobileControls.jsx";
import Footer from "../components/Footer.jsx";

function Map() {
    const logPositionPercentages = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        console.log(`Tailwind positioning string: top-[${y.toFixed(2)}%] left-[${x.toFixed(2)}%]`);
    };

    const SHOW_COLLIDERS = false;

    // 1. Character States (Positioned in percentages relative to the map canvas)
    const [player, setPlayer] = useState({ x: 10, y: 43 }); // Starting coordinates
    const [direction, setDirection] = useState('down');
    const [frame, setFrame] = useState(0);

    // NEW: Modal state for content sections
    const [activeModal, setActiveModal] = useState(null);
    const activeModalRef = useRef(activeModal);
    const triggeredBuildingRegionsRef = useRef(new Set());

    // NEW: Text Box Message State
    const [currentMessage, setCurrentMessage] = useState("");

    // Keep track of mutable state values safely inside the game ticker without causing loop breaks
    const playerRef = useRef(player);
    useEffect(() => {
        playerRef.current = player;
    }, [player]);

    useEffect(() => {
        activeModalRef.current = activeModal;
    }, [activeModal]);

    // Keep track of which keys are currently pressed down
    const keysPressed = useRef({});
    const animationInterval = useRef(null);
    const movementLoop = useRef(null);

    const handleMobileControlPress = (directionKey) => {
        keysPressed.current[directionKey] = true;
    };

    const handleMobileControlRelease = (directionKey) => {
        keysPressed.current[directionKey] = false;
    };

    // CAMERA SYSTEM REFS: Track our scrolling stage view and map dimensions dynamically
    const cameraStageRef = useRef(null);
    const mapCanvasRef = useRef(null);
    const currentBuildingRegionRef = useRef(null);

    // Speed setting: how many % points the player moves per tick
    const MOVE_SPEED = typeof window !== 'undefined' && window.innerWidth < 900 ? 0.3 : 0.1;

    // 2. DATA MAP (Divided into hard colliders vs soft building message regions)
    const colliders = [
        { id: "pond-left", top: 41.58, left: 35.35, width: 5.5, height: 31, message: "🚨 Pond ahead! You can't swim yet." },
        { id: "pond-center", top: 46.58, left: 40.35, width: 5.5, height: 26, message: "🚨 Pond ahead! You can't swim yet." },
        { id: "pond-right", top: 55.58, left: 45.5, width: 5.5, height: 17, message: "🚨 Pond ahead! You can't swim yet." },
        { id: "forest-bottom", top: 75.58, left: 0, width: 100, height: 25, message: "🌲 Don't get lost in the deep forest!" },
        { id: "forest-top", top: 0, left: 0, width: 100, height: 7, message: "🚫 The border is blocked!" }
    ];

    const buildingRegions = [
        { id: "house-zone", modalId: "about", top: 14.1, left: 15.3, width: 16, height: 25, message: "🏠 Welcome to the About Me sector!" },
        { id: "skills-zone", modalId: "skills", top: 45, left: 18.8, width: 12.5, height: 20, message: "⚡ You have entered the Tech Stack domain." },
        { id: "fame-zone", modalId: "fame", top: 20.7, left: 41.5, width: 18, height: 25, message: "🏆 Behold the Hall of Victories!" },
        { id: "projects-zone", modalId: "projects", top: 63, left: 66, width: 15, height: 25, message: "🏋️ Welcome to the Projects Gym!" }
    ];

    // 2. CAMERA ENGINE: Moves the window viewpoint to focus on the active player coordinates
    const updateCameraScroll = (playerPctX, playerPctY) => {
        if (!cameraStageRef.current || !mapCanvasRef.current) return;

        // Fetch the absolute runtime pixel width and height of your map container
        const mapRect = mapCanvasRef.current.getBoundingClientRect();

        // Convert your player percentage coordinate into exact live pixel locations
        const playerPixelX = (playerPctX / 100) * mapRect.width;
        const playerPixelY = (playerPctY / 100) * mapRect.height;

        // Calculate layout scroll adjustments based on current browser screen sizing
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const targetScrollLeft = playerPixelX - screenWidth / 2;
        const targetScrollTop = playerPixelY - screenHeight / 2;

        // Instantly shift viewport coordinates without breaks or delay tags
        cameraStageRef.current.scrollTo(targetScrollLeft, targetScrollTop);
    };

    // 3. CLEAN GAME ENGINE LOOP (Runs completely independent of React state refreshes)
    useEffect(() => {
        setTimeout(() => updateCameraScroll(player.x, player.y), 100);
    }, []);


    useEffect(() => {
        const updateMovement = () => {
            let dx = 0;
            let dy = 0;
            let isMoving = false;
            let activeMessage = "";

            if (keysPressed.current['w'] || keysPressed.current['arrowup'] || keysPressed.current['up']) { dy = -MOVE_SPEED; isMoving = true; }
            else if (keysPressed.current['s'] || keysPressed.current['arrowdown'] || keysPressed.current['down']) { dy = MOVE_SPEED; isMoving = true; }
            else if (keysPressed.current['a'] || keysPressed.current['arrowleft'] || keysPressed.current['left']) { dx = -MOVE_SPEED; isMoving = true; }
            else if (keysPressed.current['d'] || keysPressed.current['arrowright'] || keysPressed.current['right']) { dx = MOVE_SPEED; isMoving = true; }

            // Step A: Calculate where the player WANTS to go next
            const nextX = Math.max(0, Math.min(100, playerRef.current.x + dx));
            const nextY = Math.max(0, Math.min(100, playerRef.current.y + dy));


            if (isMoving) {
                // Determine direction based on movement coordinates
                let newDir = 'down';
                if (dy < 0) newDir = 'up';
                else if (dy > 0) newDir = 'down';
                else if (dx < 0) newDir = 'left';
                else if (dx > 0) newDir = 'right';

                setDirection(newDir);

                // Step B: COLLISION EVALUATION CHECKS
                // Check if the intended next position runs into a solid wall box boundary
                let isColliding = false;
                // let activeMessage = "";

                for (let wall of colliders) {
                    if (
                        nextX >= wall.left &&
                        nextX <= wall.left + wall.width &&
                        nextY >= wall.top &&
                        nextY <= wall.top + wall.height
                    ) {
                        isColliding = true;
                        activeMessage = wall.message;
                        break;
                    }
                }

                // Step C: EXECUTE POSITION CHANGES IF IMMUNE FROM SOLID BLOCKS
                if (!isColliding) {
                    setPlayer({ x: nextX, y: nextY });
                    updateCameraScroll(nextX, nextY);

                    // If not running into a wall, evaluate soft building messages
                    for (let region of buildingRegions) {
                        if (
                            nextX >= region.left &&
                            nextX <= region.left + region.width &&
                            nextY >= region.top &&
                            nextY <= region.top + region.height
                        ) {
                            activeMessage = region.message;
                            if (
                                region.modalId &&
                                !triggeredBuildingRegionsRef.current.has(region.id)
                            ) {
                                triggeredBuildingRegionsRef.current.add(region.id);
                                setActiveModal(region.modalId);
                            }
                            break;
                        }
                    }
                }

                setCurrentMessage(activeMessage);

                // ANIMATION FIX: The interval stays running steadily until keys are completely let go
                if (!animationInterval.current) {
                    setFrame(prevFrame => (prevFrame + 1) % 6);

                    animationInterval.current = setInterval(() => {
                        setFrame(prevFrame => (prevFrame + 1) % 6);
                    }, 110);
                }
            } else {
                if (animationInterval.current) {
                    clearInterval(animationInterval.current);
                    animationInterval.current = null;
                    setFrame(0);
                }
            }
        };

        const loop = () => {
            updateMovement();
            movementLoop.current = requestAnimationFrame(loop);
        };
        movementLoop.current = requestAnimationFrame(loop);

        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            if (e.repeat) return;
            keysPressed.current[key] = true;
        };

        const handleKeyUp = (e) => {
            keysPressed.current[e.key.toLowerCase()] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const handleResize = () => updateCameraScroll(playerRef.current.x, playerRef.current.y);
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(movementLoop.current);
            clearInterval(animationInterval.current);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        /* The main outer wrapper stays fixed and fills the screen */
        /* CAMERA PORT LAYER: Automatically masks out overflow bars and controls the viewing context window */
        <div
            ref={cameraStageRef}
            className='w-screen h-screen fixed inset-0 overflow-hidden bg-black relative'
        >
            {/* ==================== CONTENT SECTIONS POPUP LAYER ==================== */}
            {/* 4. Render out the content segments mapped right here */}
            <Modal
                isOpen={activeModal === 'about'}
                onClose={() => setActiveModal(null)}
                title="Profile Log: About Me"
                type="about"
                leftContent={null}
                rightContent={null}
            />

            <Modal
                isOpen={activeModal === 'skills'}
                onClose={() => setActiveModal(null)}
                title="Terminal: Tech Stack"
                type="skills"
                leftContent={null}
                rightContent={null}
            />

            <Modal
                isOpen={activeModal === 'fame'}
                onClose={() => setActiveModal(null)}
                title="🏆 Hall of Fame: Victories & Achievements"
                type="fame"
                leftContent={null}
                rightContent={null}
            />

            <Modal
                isOpen={activeModal === 'projects'}
                onClose={() => setActiveModal(null)}
                title="🏋️ The Projects Gym: Built Applications"
                type="projects"
                leftContent={null}
                rightContent={null}
            />


            {/* NEW: GAME UI OVERLAY MESSAGE BOX (Stays fixed to the top middle of the user screen) */}
            {currentMessage && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md animate-fade-in">
                    <div className="mx-4 bg-zinc-900/90 text-white font-medium border border-zinc-700 px-6 py-3 rounded-xl shadow-2xl backdrop-blur-md text-center text-sm uppercase tracking-wider">
                        {currentMessage}
                    </div>
                </div>
            )}
            {/* MAP LAYOUT WRAPPER: Stays linked directly to your exact structural aspect ratio and style values */}
            <div
                ref={mapCanvasRef}
                className="relative aspect-[18/7] h-full max-w-none w-auto flex-shrink-0"
                onClick={logPositionPercentages}
            >

                {/* The map image now matches this structural container perfectly */}
                <img className='w-full h-full object-fill' src={mapImage} alt="map image" />

                {/* THE RENDERED CHARACTER */}
                <Character
                    posX={player.x}
                    posY={player.y}
                    direction={direction}
                    currentFrame={frame}
                    message={currentMessage}
                />

                {/* 1. House Region */}
                <NamePlate top="2.1%" left="12.3%" width="10%" name="About Me" />
                <MapRegion top="2.1%" left="12.3%" width="16%" onClick={() => setActiveModal('about')}>
                    <img className="w-full h-auto object-contain" src={houseImage} alt="house" />
                </MapRegion>

                {/* 2. Skills Region */}
                <NamePlate top="41%" left="16.8%" width="10%" name="Tech Stack and Contact" />
                <MapRegion top="41%" left="16.8%" width="12.5%" onClick={() => setActiveModal('skills')}>
                    <img className="w-full h-auto object-contain" src={skillsImage} alt="skills" />
                </MapRegion>

                {/* 3. Hall of Fame Region */}
                <NamePlate top="0.7%" left="41.5%" width="8%" name="Victories" />
                <MapRegion top="0.7%" left="41.5%" width="18%" onClick={() => setActiveModal('fame')}>
                    <img className="w-full h-auto object-contain" src={hallOfFameImage} alt="hall of fame" />
                </MapRegion>

                {/* 4. Projects Region */}
                <NamePlate top="33%" left="66%" width="10%" name="Projects" />
                <MapRegion top="33%" left="66%" width="15%" onClick={() => setActiveModal('projects')}>
                    <img className="w-full h-auto object-contain" src={projectsImage} alt="projects" />
                </MapRegion>

                {/* Colliders */}
                <Collider
                    id="pond-left"
                    top="41.58%" left="35.35%" width="5.5%" height="31%"
                    message="Pond ahead! You can't swim yet."
                    debug={SHOW_COLLIDERS}
                />
                <Collider
                    id="pond-center"
                    top="46.58%" left="40.35%" width="5.5%" height="26%"
                    message="Pond ahead! You can't swim yet."
                    debug={SHOW_COLLIDERS}
                />
                <Collider
                    id="pond-right"
                    top="55.58%" left="45.5%" width="5.5%" height="17%"
                    message="Pond ahead! You can't swim yet."
                    debug={SHOW_COLLIDERS}
                />
                {/* bottom forest */}
                <Collider
                    id="forest-bottom"
                    top="75.58%" left="0%" width="100%" height="25%"
                    message="Don't get lost in forest!"
                    debug={SHOW_COLLIDERS}
                />
                {/* top forest */}
                <Collider
                    id="forest-top"
                    top="0%" left="0%" width="100%" height="7%"
                    message="Don't get lost in forest!"
                    debug={SHOW_COLLIDERS}
                />
                {/* bottom forest */}
                <Collider
                    id="forest-top-left"
                    top="6.58%" left="0%" width="13%" height="25%"
                    message="Don't get lost in forest!"
                    debug={SHOW_COLLIDERS}
                />

                {/* id="forest-bottom-left"
                top="55.58%" left="1%" width="15%" height="20%"
                message="Don't get lost in forest!"
                debug={SHOW_COLLIDERS}
                /> */}
            </div>

            <MobileControls
                onPress={handleMobileControlPress}
                onRelease={handleMobileControlRelease}
            />

            <Footer />

        </div>
    )
}

export default Map
