import { Client, Storage } from 'appwrite';

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '';

client
  .setEndpoint(endpoint)
  .setProject(projectId);

export const storage = new Storage(client);

/**
 * Returns the URL to preview an audio file from Appwrite Storage.
 * This URL supports 206 Partial Content for streaming.
 */
export const getAudioStreamUrl = (fileId: string) => {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '';
  if (!bucketId || !fileId) return '';
  
  // getFileView returns the file for viewing/streaming directly in the browser
  return storage.getFileView(bucketId, fileId).toString();
};

/**
 * Returns the URL to preview an image file from Appwrite Storage.
 */
export const getImagePreviewUrl = (fileId: string) => {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '';
  if (!bucketId || !fileId) return '';
  
  return storage.getFilePreview(bucketId, fileId).toString();
};
