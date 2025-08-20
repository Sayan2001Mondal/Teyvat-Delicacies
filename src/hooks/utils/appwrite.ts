// hooks/utils/appwrite.ts
import { Client, Account, Databases, ID, Query , Storage} from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);


// Constants
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const MENU_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_MENU_COLLECTION_ID!;

// CRUD Functions
export async function createMenuItem(data: {
  name: string;
  description: string;
  type: string;
  nation: string;
  price: number;
  imageUrl: string;
}) {
  return await databases.createDocument(
    DATABASE_ID,
    MENU_COLLECTION_ID,
    ID.unique(),
    data
  );
}

export async function getMenuItems() {
  return await databases.listDocuments(DATABASE_ID, MENU_COLLECTION_ID, [
    Query.orderDesc("$createdAt"),
  ]);
}

export async function updateMenuItem(id: string, data: Partial<{
  name: string;
  description: string;
  type: string;
  nation: string;
  price: number;
  imageUrl: string;
}>) {
  return await databases.updateDocument(DATABASE_ID, MENU_COLLECTION_ID, id, data);
}

export async function deleteMenuItem(id: string) {
  return await databases.deleteDocument(DATABASE_ID, MENU_COLLECTION_ID, id);
}
export { ID, Query };

