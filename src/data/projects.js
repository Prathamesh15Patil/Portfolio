export const projectsData = [
  {
    id: "colab",
    title: "Code coLAB",
    status: "Active",
    github: "https://github.com/Prathamesh15Patil/coLAB",
    live: "https://codecolab.example.com",
    stack: ["React.js", "Node.js", "Express.js", "Socket.IO", "Docker"],
    problem:
      "Traditional practical sessions are passive and student don't actually learn solution building . Instead focus on lab journal completion and submission.",
    solution:
      "A real-time collaborative coding platform with synchronized typing, integrated voice chat, and secure code execution.",
    features: [
      "Real-time synchronized pair-programming",
      "Integrated WebRTC voice communication",
      "Docker-based sandbox execution engine with resource constraints",
      "Role-based access control for classroom environments",
    ],
    architecture:
      "React frontend communicating via Socket.IO to a Node backend, which spins up isolated Docker containers for code execution.",
    image: null, // Can be populated with an import in the UI
  },
  {
    id: "outreach",
    title: "Automated Outbound Pipeline",
    status: "Completed",
    github:
      "https://github.com/Prathamesh15Patil/Automated_Outbound_Outreach_Pipeline",
    live: "#",
    stack: ["Node.js", "Axios", "Ocean.io API", "Prospeo API", "Brevo API"],
    problem:
      "Manual lead generation and outreach is time-consuming and error-prone.",
    solution:
      "An automated system for company discovery, contact enrichment, and personalized email delivery.",
    features: [
      "API orchestration with filtering and deduplication",
      "Metadata-driven email personalization",
      "Automated contact enrichment",
    ],
    architecture:
      "Node.js cron jobs triggering sequential API requests across multiple third-party services.",
    image: null,
  },
  {
    id: "agriassist",
    title: "AgriAssist",
    status: "Active",
    github: "https://github.com/Prathamesh15Patil/AgriAssist-Appfrontend",
    live: "#",
    stack: ["React Native", "Node.js", "Express.js", "AI Integration"],
    problem:
      "Farmers lack immediate access to crop disease diagnosis and localized agricultural information.",
    solution:
      "A multilingual AI system to detect crop diseases from images and deliver actionable recommendations.",
    features: [
      "AI-powered crop disease detection",
      "Multilingual user interface",
      "Location-based services for soil testing labs",
      "Integration with government agricultural schemes",
    ],
    architecture:
      "React Native mobile app communicating with a Node backend that interfaces with AI diagnostic models.",
    image: null,
  },
];
