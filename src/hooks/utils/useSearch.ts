import { databases, storage } from "./appwrite";
import { Query } from "appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

export const searchMenus = async (query: string) => {
  if (!query.trim()) return []

  try {
    const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
      Query.search("name", query), // ✅ full text search
    ]);

    return res.documents.map((doc) => ({
      ...doc,
      imageUrl: doc.ImageUrl
        ? storage.getFilePreview(BUCKET_ID, doc.ImageUrl)
        : null,
    }))
  } catch (err) {
    console.error("Search error:", err)
    return [];
  }
};
