// hooks/services/menuService.ts
import { databases } from "@/hooks/utils/appwrite";
import { ID, Query } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;

// TYPES
export type MenuItem = {
  $id?: string;
  name: string;
  description: string;
  type: MenuType;
  nation: NationType;
  price: number;
  imageUrl: string;
};

export type MenuType = "Entree" | "Main" | "Dessert" ;
export type NationType = "Mondstadt" | "Liyue" | "Inazuma" | "Sumeru" | "Fontaine" | "Natlan";

// CRUD
export async function listMenuItems() {
  return databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.orderDesc("$createdAt")]);
}

export async function getMenuItem(id: string) {
  return databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
}

export async function createMenuItem(payload: MenuItem) {
  return databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
}

export async function updateMenuItem(id: string, payload: Partial<MenuItem>) {
  return databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, payload);
}

export async function deleteMenuItem(id: string) {
  return databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
}
