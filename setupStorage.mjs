import { Client, Storage, Permission, Role, ID } from "node-appwrite";

const endpoint = "https://sgp.cloud.appwrite.io/v1";
const projectId = "69e0e2ae001c036d3054";
const apiKey = "standard_d74e8caff2ed536be6867a0eeb8cda75602950334c0024f146be7934c239dcad77b1ee432821edc5449f11b49c326443be9b6b6ad2ae0c25fe059525c42fe91d88ce6893c914aed02e294b96cca053c2f3879a70f14a3c192757cd6a561ae2239cc5d817057be485f924a37dcd367ced4c93683f2349ad4c51569923b3adccd0";

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const storage = new Storage(client);

async function setup() {
  try {
    console.log("Creating 'portfolio_media' bucket...");
    const bucket = await storage.createBucket(
      "portfolio_media",
      "Portfolio Media",
      [Permission.read(Role.any()), Permission.write(Role.users())], // Permissions
      false, // fileSecurity
      false, // enabled
      undefined, // maximumFileSize
      ["jpg", "png", "jpeg", "webp", "mp3", "wav", "pdf"] // allowedFileExtensions
    );
    console.log("Bucket created successfully!", bucket.$id);
  } catch (err) {
    if (err.code === 409) {
      console.log("Bucket already exists!");
    } else {
      console.error("Failed to create bucket:", err);
    }
  }
}

setup();
