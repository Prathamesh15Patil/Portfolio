import homeImage from "../assets/buildings/house.png";
import skillsImage from "../assets/buildings/training.png";
import hallOfFameImage from "../assets/buildings/hall_of_fame.png";
import projectsImage from "../assets/buildings/gym1.png";

export const mapSections = [
  {
    id: "about",
    label: "About Me",
    image: homeImage,
    x: 217,
    y: 85,
    w: 190,
    glowSize: 230,
    glow: "bg-red-400/20",
  },
  {
    id: "skills",
    label: "Skills",
    image: skillsImage,
    x: 270,
    y: 325,
    w: 160,
    glowSize: 240,
    glow: "bg-pink-500/20",
  },
  {
    id: "projects",
    label: "Projects",
    image: projectsImage,
    x: 1050,
    y: 270,
    w: 200,
    glowSize: 260,
    glow: "bg-amber-400/20",
  },
  {
    id: "hall",
    label: "Hall of Fame",
    image: hallOfFameImage,
    x: 650,
    y: 20,
    w: 260,
    glowSize: 300,
    glow: "bg-yellow-400/20",
  },
];
