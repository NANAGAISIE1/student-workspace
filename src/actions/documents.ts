"use server";

import { client } from "@/db";
import { currentUser } from "./user";

const getUserId = async () => {
  const user = await currentUser();
  return user?.id;
};

export async function getDocuments() {
  try {
    const userId = await getUserId();
    const documents = await client.db.documents
      .filter({ "user.id": userId })
      .getAll();
    return documents.toSerializable();
  } catch (error) {
    console.error("Failed to get documents:", error);
  }
}

export async function createDocument() {
  try {
    const userId = await getUserId();
    const document = await client.db.documents.create({
      title: "Untitled",
      user: userId,
    });
    return document.toSerializable();
  } catch (error) {
    console.error("Failed to create document:", error);
  }
}

export async function updateDocument({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  try {
    const userId = await getUserId();
    const document = await client.db.documents
      .filter({ id, "user.id": userId })
      .getFirst();
    if (!document) {
      throw new Error(`Document with id ${id} not found`);
    }
    await document.update({ title });
    return document.toSerializable();
  } catch (error) {
    console.error("Failed to update document:", error);
  }
}

export async function deleteDocument({ id }: { id: string }) {
  try {
    const userId = await getUserId();
    const document = await client.db.documents
      .filter({ id, "user.id": userId })
      .getFirst();
    if (!document) {
      throw new Error(`Document with id ${id} not found`);
    }
    await document.delete();
  } catch (error) {
    console.error("Failed to delete document:", error);
  }
}
