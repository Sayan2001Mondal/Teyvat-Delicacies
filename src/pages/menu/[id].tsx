import { GetServerSideProps } from "next";
import { databases, storage } from "@/hooks/utils/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

interface Dish {
  $id: string;
  name: string;
  description?: string;
  price?: number;
  type?: string;
  nation?: string;
  imageUrl?: string;
}

interface MenuDetailProps {
  item: Dish | null;
}

export default function MenuDetail({ item }: MenuDetailProps) {
  if (!item) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Not Found</h1>
        <p className="text-gray-600">This dish does not exist or was removed.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-64 h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <p className="font-semibold">Type: {item.type}</p>
      <p className="font-semibold">Nation: {item.nation}</p>
      <p className="font-semibold">Price: {item.price ? `$${item.price}` : "N/A"}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const doc: any = await databases.getDocument(DB_ID, COLLECTION_ID, id);

    const item: Dish = {
      ...doc,
      imageUrl: doc.imageUrl
        ? storage.getFilePreview(BUCKET_ID, doc.imageUrl).toString()
        : null,
    };

    return { props: { item } };
  } catch (error) {
    console.error("Error fetching dish:", error);
    return { props: { item: null } };
  }
};
