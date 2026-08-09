"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setUserLocale(locale: "es" | "en") {
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, { path: "/" });
  revalidatePath("/");
}
