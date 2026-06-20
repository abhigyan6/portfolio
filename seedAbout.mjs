import { Client, Databases, ID, Permission, Role } from "node-appwrite";

const endpoint = "https://sgp.cloud.appwrite.io/v1";
const projectId = "69e0e2ae001c036d3054";
const apiKey = "standard_d74e8caff2ed536be6867a0eeb8cda75602950334c0024f146be7934c239dcad77b1ee432821edc5449f11b49c326443be9b6b6ad2ae0c25fe059525c42fe91d88ce6893c914aed02e294b96cca053c2f3879a70f14a3c192757cd6a561ae2239cc5d817057be485f924a37dcd367ced4c93683f2349ad4c51569923b3adccd0";

if (!apiKey) {
  console.error("Error: APPWRITE_API_KEY environment variable is not set.");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);
const dbId = "portfolio_db";

const CONTENT_BLOCKS = [
  { key: "about_bio", value: "Hey, I'm Abhigyan, a multi-disciplinary designer and developer focused on creating immersive web experiences. I bridge the gap between design and engineering, crafting products that look beautiful and perform brilliantly." },
  { key: "about_location", value: "India" },
  { key: "about_email", value: "darpit336@gmail.com" },
  { key: "about_phone", value: "+91 xxxx-xxxx" },
  { key: "about_currently_building", value: "Next-Gen Web Experiences" },
  { key: "resume_url", value: "https://example.com/resume.pdf" },
  { key: "tech_stack", value: JSON.stringify(["React", "Next.js", "Three.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma", "Node.js", "Python", "Appwrite"]) },
  { key: "social_links", value: JSON.stringify([
      { platform: "GitHub", url: "https://github.com/abhigyandwivedi" },
      { platform: "Twitter", url: "https://twitter.com/abhigyandwivedi" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/abhigyandwivedi" }
  ]) }
];

const EXPERIENCES = [
  { role: "Lead Design Engineer", company: "Studio X", period: "2023 - Present", description: "Spearheading the development of immersive web experiences using Three.js and React." },
  { role: "Frontend Developer", company: "TechNova", period: "2021 - 2023", description: "Built scalable web applications serving millions of users globally." },
  { role: "UI/UX Designer", company: "Freelance", period: "2019 - 2021", description: "Designed user interfaces for startups and established brands." }
];

const EDUCATION = [
  { degree: "B.Tech in Computer Science", institution: "University of Technology", period: "2018 - 2022", description: "Graduated with Honors. Specialized in Human-Computer Interaction." },
  { degree: "Advanced UI/UX Certification", institution: "Design Institute", period: "2021", description: "Completed rigorous coursework in modern design principles." }
];

async function setupAbout() {
  try {
    // 1. Create and Seed Experiences Collection
    console.log("Creating 'experiences' collection...");
    let expColl;
    try {
      expColl = await databases.createCollection(dbId, ID.custom("experiences"), "Experiences", [Permission.read(Role.any()), Permission.write(Role.users())]);
    } catch (e) {
      if (e.code === 409) {
        expColl = await databases.getCollection(dbId, "experiences");
        console.log("Experiences collection already exists.");
      } else throw e;
    }

    try { await databases.createStringAttribute(dbId, expColl.$id, "role", 255, true); } catch (e) { console.log(e.message); }
    try { await databases.createStringAttribute(dbId, expColl.$id, "company", 255, true); } catch (e) { console.log(e.message); }
    try { await databases.createStringAttribute(dbId, expColl.$id, "period", 255, true); } catch (e) { console.log(e.message); }
    try { await databases.createStringAttribute(dbId, expColl.$id, "description", 1000, true); } catch (e) { console.log(e.message); }
    console.log("Waiting for experience attributes to be active...");
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log("Seeding Experiences...");
    for (const exp of EXPERIENCES) {
      await databases.createDocument(dbId, expColl.$id, ID.unique(), exp);
    }

    // 2. Create and Seed Education Collection
    console.log("Creating 'education' collection...");
    let eduColl;
    try {
      eduColl = await databases.createCollection(dbId, ID.custom("education"), "Education", [Permission.read(Role.any()), Permission.write(Role.users())]);
    } catch (e) {
      if (e.code === 409) {
        eduColl = await databases.getCollection(dbId, "education");
        console.log("Education collection already exists.");
      } else throw e;
    }

    try { await databases.createStringAttribute(dbId, eduColl.$id, "degree", 255, true); } catch (e) {}
    try { await databases.createStringAttribute(dbId, eduColl.$id, "institution", 255, true); } catch (e) {}
    try { await databases.createStringAttribute(dbId, eduColl.$id, "period", 255, true); } catch (e) {}
    try { await databases.createStringAttribute(dbId, eduColl.$id, "description", 1000, true); } catch (e) {}
    console.log("Waiting for education attributes to be active...");
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log("Seeding Education...");
    for (const edu of EDUCATION) {
      await databases.createDocument(dbId, eduColl.$id, ID.unique(), edu);
    }

    // 3. Seed Content Blocks
    console.log("Seeding Content Blocks for About Section...");
    for (const block of CONTENT_BLOCKS) {
      try {
        await databases.createDocument(dbId, "content_blocks", block.key, block);
      } catch (e) {
        if (e.code === 409) {
          await databases.updateDocument(dbId, "content_blocks", block.key, { value: block.value });
        } else {
          console.error(`Failed to insert ${block.key}:`, e);
        }
      }
    }

    console.log("✅ About Section Setup Complete!");
  } catch (err) {
    console.error("Setup failed:", err);
  }
}

setupAbout();
