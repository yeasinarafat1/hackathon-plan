export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
  complainCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COMPLAIN_COLLECTION!,
  complainAttachmentsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_COMPLAIN_ATTACHMENTS!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
  secretKey: process.env.NEXT_APPWRITE_KEY!,
};
