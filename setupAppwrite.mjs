import { Client, Databases, Users, ID, Permission, Role } from "node-appwrite";

const endpoint = "https://sgp.cloud.appwrite.io/v1";
const projectId = "69e0e2ae001c036d3054";

// You must export this environment variable before running:
// export APPWRITE_API_KEY="your-api-key"
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
const users = new Users(client);

async function setup() {
  try {
    console.log("Creating Admin User...");
    try {
      await users.create(
        ID.custom("admin"),
        "admin@abhigyandwivedi.me",
        null,
        "SuperSecurePassword123!",
        "Admin User"
      );
      console.log("✅ Admin user created (admin@abhigyandwivedi.me / SuperSecurePassword123!)");
    } catch (e) {
      console.log("ℹ️ Admin user might already exist, skipping...");
    }

    console.log("Creating Database...");
    const db = await databases.create(
      ID.custom("portfolio_db"),
      "Portfolio Database"
    );
    console.log(`✅ Database created with ID: ${db.$id}`);

    // Create Projects Collection
    console.log("Creating 'projects' collection...");
    const projectsColl = await databases.createCollection(
      db.$id,
      ID.custom("projects"),
      "Projects",
      [
        Permission.read(Role.any()), // Anyone can read
        Permission.write(Role.users()), // Only logged in users (Admin) can write
      ]
    );
    
    await databases.createStringAttribute(db.$id, projectsColl.$id, "title", 255, true);
    await databases.createStringAttribute(db.$id, projectsColl.$id, "description", 1000, true);
    await databases.createStringAttribute(db.$id, projectsColl.$id, "link", 255, true);
    await databases.createStringAttribute(db.$id, projectsColl.$id, "tags", 255, true, null, true); // Array of strings
    console.log("✅ 'projects' collection ready.");

    // Create Content Collection (for Hero/About)
    console.log("Creating 'content_blocks' collection...");
    const contentColl = await databases.createCollection(
      db.$id,
      ID.custom("content_blocks"),
      "Content Blocks",
      [
        Permission.read(Role.any()),
        Permission.write(Role.users()),
      ]
    );
    await databases.createStringAttribute(db.$id, contentColl.$id, "key", 255, true); // e.g., "hero_headline"
    await databases.createStringAttribute(db.$id, contentColl.$id, "value", 5000, true);
    console.log("✅ 'content_blocks' collection ready.");

    console.log("\n🚀 Setup Complete! You can now log into your /admin portal using:");
    console.log("Email: admin@abhigyandwivedi.me");
    console.log("Password: SuperSecurePassword123!");
    console.log("\nPlease change this password inside the Appwrite Console later.");

  } catch (error) {
    console.error("Setup Failed:", error);
  }
}

setup();
