"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { databases, storage } from "@/hooks/utils/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

export default function MenuDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    if (id) {
      databases.getDocument(DB_ID, COLLECTION_ID, id as string).then((doc) => {
        setItem({
          ...doc,
          imageUrl: doc.imageUrl
            ? storage.getFilePreview(BUCKET_ID, doc.imageUrl).toString()
            : null,
        });
      });
    }
  }, [id]);

  if (!item) return <p className="p-6">Loading...</p>;

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
      <p className="font-semibold">Price: {item.price}</p>
    </div>
  );
}
