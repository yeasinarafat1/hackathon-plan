// env.d.ts

import type { Models } from "node-appwrite";

declare global {
  namespace App {
    interface Locals {
      user: Models.User<Models.Preferences> | undefined;
    }
  }
}

export {};
