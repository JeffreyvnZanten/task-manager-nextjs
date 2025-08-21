"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function onSubmit(formData: FormData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  //   console.log("Raw FormData values:", { email, password });

  const bodyData = {
    email: email?.toString() || "",
    password: password?.toString() || "",
    rememberMe: true,
    callbackURL: "/projects",
  };

  console.log("Body being sent:", JSON.stringify(bodyData, null, 2));

  try {
    const data = await auth.api.signInEmail({
      body: bodyData,
      headers: await headers(),
    });
    console.log("Success:", data);
    console.log("Redirecting to:", data.url);

    if (data.redirect && data.url) {
      revalidatePath(data.url);
    }
  } catch (error: any) {
    console.error("Full error:", error);
    console.error("Error body:", error.body);
    throw error;
  }
}
