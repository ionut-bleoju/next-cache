"use server";

import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";

type ActionResult = {
  ok: boolean;
  message?: string;
};

export async function login(formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { ok: false, message: "Email and password are required" };
  }
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { ok: true };
  } catch (error) {
    console.error("Login error:", error);
    return {
      ok: false,
      message: "Invalid email or password. Please try again.",
    };
  }
}

export async function register(formData: FormData): Promise<ActionResult> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!name || !email || !password) {
    return { ok: false, message: "Name, email and password are required" };
  }
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { ok: true };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      ok: false,
      message: "Registration failed. Email may already be in use.",
    };
  }
}

export async function logout(): Promise<void> {
  const headersList = await headers();

  try {
    await auth.api.signOut({
      headers: headersList,
    });
    redirect("/");
  } catch (error) {
    console.error("Logout error:", error);
    redirect("/");
  }
}
