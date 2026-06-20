import { Client, Databases, ID } from "node-appwrite";

const endpoint = "https://sgp.cloud.appwrite.io/v1";
const projectId = "69e0e2ae001c036d3054";
const apiKey = process.env.APPWRITE_API_KEY;

if (!apiKey) {
  console.error("Error: APPWRITE_API_KEY environment variable is not set.");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);

// To find the DB ID, we can list databases.
// But we know we just created it with ID 'portfolio_db'
const dbId = "portfolio_db";

const projects = [
  {
    title: "LNUniverse Architecture",
    description: "Architected a high-performance community platform from 0 to 1. Built a comprehensive design system in Figma and translated it into pixel-perfect React components to solve complex user onboarding challenges.",
    link: "#",
    tags: ["Design Systems", "Figma", "Interaction Design"]
  },
  {
    title: "E-Cell Visual Identity",
    description: "Designed complete visual identities for high-stakes startup events. Created strict brand guidelines that scaled across print, social campaigns, and massive 10x10ft stage banners.",
    link: "#",
    tags: ["Branding", "Print", "Typography"]
  },
  {
    title: "Audio-Reactive WebGL Engine",
    description: "Engineered a custom physics engine running on React Three Fiber. Implemented an AudioContext LFO to map real-time FFT frequency data directly into the GPU shaders, creating a living, breathing 3D environment.",
    link: "#",
    tags: ["WebGL", "Three.js", "GLSL"]
  }
];

const contentBlocks = [
  {
    key: "hero_roles",
    value: JSON.stringify(["Product Designer", "Frontend Developer", "Creative Engineer"])
  },
  {
    key: "hero_tagline",
    value: "Building elegant systems. Designing beautiful experiences."
  }
];

async function seed() {
  try {
    console.log("Seeding Projects...");
    for (const proj of projects) {
      await databases.createDocument(dbId, "projects", ID.unique(), proj);
      console.log(`✅ Seeded project: ${proj.title}`);
    }

    console.log("Seeding Content Blocks...");
    for (const block of contentBlocks) {
      // Check if exists first to avoid duplicates (optional, we just created it)
      await databases.createDocument(dbId, "content_blocks", ID.unique(), block);
      console.log(`✅ Seeded content block: ${block.key}`);
    }

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Seeding failed:", err);
  }
}

seed();
