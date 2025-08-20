// hooks/services/menuService.ts
import { databases, storage } from "@/hooks/utils/appwrite";
import { ID, Query } from "appwrite";
import { MenuItem} from "../../../interfaces/interface";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID as string;


// CRUD
export async function listMenuItems() {
  return databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.orderDesc("$createdAt")]);
}

export async function getMenuItem(id: string) {
  return databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
}

export async function createMenuItem(payload: MenuItem) {
  const fileResponse = await storage.createFile(BUCKET_ID,ID.unique(),payload.image[0])
  const url =  storage.getFileView(BUCKET_ID,fileResponse.$id)
  const { image, ...restPayload } = payload;
  restPayload.imageUrl = url;
  return databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), restPayload);
}

export async function updateMenuItem(id: string, payload: Partial<MenuItem>) {
  return databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, payload);
}

export async function deleteMenuItem(id: string) {
  return databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
}

