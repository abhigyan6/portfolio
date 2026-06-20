import { Client, Databases, ID, Permission, Role } from "node-appwrite";

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
const dbId = "portfolio_db";

const TRACKS = [
  {
    name: "Life Goes On",
    artist: "Oliver Tree",
    imageId: "6a36a2277eb15ba6b8c1",
    audioId: "6a369db26e493e0b0968"
  },
  {
    name: "Putt Jatt Da",
    artist: "Diljit Dosanjh",
    imageId: "6a36a2284a7fe2ac1185",
    audioId: "6a369db09ce766e9b2d6"
  },
  {
    name: "goosebumps",
    artist: "Travis Scott",
    imageId: "6a36a228b31a70657823",
    audioId: "6a369db3e2c03fe8a652"
  },
  {
    name: "Feel Good Inc.",
    artist: "Gorillaz",
    imageId: "6a36a2292c4fd6f0c6c7",
    audioId: "6a369db55c648d166199"
  },
  {
    name: "Little Dark Age",
    artist: "MGMT",
    imageId: "6a36a22992e84387bc33",
    audioId: "6a369db7169948d9f8be"
  },
  {
    name: "Just Keep Watching",
    artist: "Tate McRae",
    imageId: "6a36a22a08864e40e1e1",
    audioId: "6a369db80aba8c693915"
  }
];

async function setupAudio() {
  try {
    console.log("Creating 'audio_tracks' collection...");
    const coll = await databases.createCollection(
      dbId,
      ID.custom("audio_tracks"),
      "Audio Tracks",
      [
        Permission.read(Role.any()),
        Permission.write(Role.users()),
      ]
    );
    
    await databases.createStringAttribute(dbId, coll.$id, "name", 255, true);
    await databases.createStringAttribute(dbId, coll.$id, "artist", 255, true);
    await databases.createStringAttribute(dbId, coll.$id, "imageId", 255, true);
    await databases.createStringAttribute(dbId, coll.$id, "audioId", 255, true);
    
    console.log("Waiting for attributes to be active...");
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log("Seeding Audio Tracks...");
    for (const track of TRACKS) {
      await databases.createDocument(dbId, coll.$id, ID.unique(), track);
      console.log(`✅ Seeded track: ${track.name}`);
    }

    console.log("Audio Setup Complete!");
  } catch (err) {
    console.error("Setup failed:", err);
  }
}

setupAudio();
