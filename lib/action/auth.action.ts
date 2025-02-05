// src/app/signup/page.jsx

"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID, Query } from "node-appwrite";
import { appwriteConfig } from "../appwrite/config";

export async function signUpWithEmail({
  name,
  email,
  phone,
  password,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const { account, databases, avatars, storage } = await createAdminClient();
  try {
    // Validate inputs
    if (!email || !password || !name) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Create user account
    const user = await account.create(ID.unique(), email, password, name);
    if (!user) {
      return {
        success: false,
        error: "Registration failed",
      };
    }
    const initialAvatar = await avatars.getInitials(name);
    const file = new File([initialAvatar], "image.png", {
      type: "image/png",
      lastModified: Date.now(),
    });
    const uploadedFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file
    );
    const avatarUrl = `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.bucketId}/files/${uploadedFile.$id}/view?project=${appwriteConfig.projectId}&mode=admin`;
    console.log(avatarUrl);

    const dbUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        UserId: user.$id,
        email,
        name,
        phone,
        avatar: avatarUrl,
      }
    );
    if (!dbUser) {
      return {
        success: false,
        error: "Registration failed",
      };
    }
    const session = await account.createEmailPasswordSession(email, password);

    // Store the session in cookies
    const cookieStore = await cookies();
    cookieStore.set("session", session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    // Create session (log in)
    return {
      success: true,
      user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Registration failed",
    };
  }
} // Redirect to a dashboard or another page after signup
export const signInWithEmailAndPass = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { account } = await createAdminClient();
  try {
    // Validate inputs
    if (!email || !password) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Create session (log in)
    const session = await account.createEmailPasswordSession(email, password);

    // Store the session in cookies
    const cookieStore = await cookies();
    cookieStore.set("session", session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Sign in failed",
    };
  }
};
export async function signOut() {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("session");
  } catch (error) {
    console.log(error);
    return;
  }
  redirect("/sign-in");
}
export async function getUser() {
  try {
    const { account, databases } = await createSessionClient();
    const userAccount = await account.get();
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("UserId", userAccount.$id)]
    );
    return user.documents[0];
  } catch (error) {
    return null;
  }
}
