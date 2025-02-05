"use server";

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { getUser } from "./auth.action";

export const createComplaint = async (
  data: {
    isAnonymous: "yes" | "no";
    description: string;
    complaintType: string;
    email?: string;
  },
  files: File[]
) => {
  const AnonymousUserId = "67a25c6d0025a6cc79ef";

  const userObj = await getUser();
  try {
    const { databases, storage } = await createAdminClient();

    const uloadPromises = files.map((file) => {
      return storage.createFile(appwriteConfig.bucketId, ID.unique(), file);
    });

    const complain = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.complainCollectionId,
      ID.unique(),
      {
        user: data.isAnonymous === "no" ? userObj?.$id : AnonymousUserId,
        isAnonymous: data.isAnonymous === "yes",
        description: data.description,
        type: data.complaintType,
        email: data.email,

        complainClass: "Critical",

        summary: "Random twjejsdfjhjhdkjjkasfdjlksjhfjjfdjjf",
      }
    );
    const uploadedFiles = await Promise.all(uloadPromises);
    console.log(uploadedFiles);

    const complainAttachments = uploadedFiles.map((file) => {
      return {
        fileId: file.$id,
        filename: file.name,
        mimeType: file.mimeType,
        fileUrl: `https://cloud.appwrite.io/v1/storage/buckets/${file.bucketId}/files/${file.$id}/view?project=${appwriteConfig.projectId}`,
      };
    });
    const dbFiles = complainAttachments.map((file) => {
      return databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.complainAttachmentsCollectionId,
        ID.unique(),
        {
          complainId: complain.$id,
          fileId: file.fileId,
          filename: file.filename,
          mimeType: file.mimeType,
          fileUrl: file.fileUrl,
        }
      );
    });

    const newDbfiles = await Promise.all(dbFiles);
    if (!newDbfiles[0].$id) {
      throw new Error("Failed to upload files");
    }
    return complain;
  } catch (error) {
    console.error(error);
    return null;
  }
};
