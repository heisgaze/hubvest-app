"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setRoleCookie(userId: string) {
  cookies().set("X-User-Id", userId, { path: "/" });
  // Revalidate everything to reflect the new role
  revalidatePath("/", "layout");
}

export async function getRoleCookie() {
  const cookieStore = cookies();
  const userId = cookieStore.get("X-User-Id")?.value;
  // Default to Farmer if not set
  return userId || "u1";
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function createListingAction(formData: FormData) {
  const userId = await getRoleCookie();
  
  const payload = {
    seller_id: userId,
    commodity_id: formData.get("commodity"),
    title: formData.get("title") || "Panen Baru",
    quantity: parseFloat(formData.get("quantity") as string),
    unit: formData.get("unit"),
    price: parseFloat(formData.get("price") as string),
    location: formData.get("location"),
    grade: formData.get("grade") as string || "B",
    description: formData.get("description"),
  };

  const res = await fetch(`${API_BASE_URL}/listings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to create listing");
  }

  revalidatePath("/listing");
}

export async function submitBidAction(listingId: string, amount: number) {
  const userId = await getRoleCookie();
  
  const res = await fetch(`${API_BASE_URL}/listings/${listingId}/bids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId,
    },
    body: JSON.stringify({ amount })
  });

  if (!res.ok) {
    throw new Error("Failed to submit bid");
  }

  revalidatePath(`/listing/${listingId}`);
}
