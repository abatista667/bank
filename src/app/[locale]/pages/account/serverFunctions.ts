"use server";
import client from "@/app/client/client";
import { Account } from "@/app/types";
import { revalidatePath } from "next/cache";

export async function addOrUpdateAccount(account: Account) {
  try {
    const data = await (await client.post("/api/account", account)).data;
    revalidatePath("/pages/account");
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function deleteAccount(id: number) {
  try {
    await client.delete("/api/account/" + id);
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath("/pages/account");
  }
}

export async function getAccounts() {
  try {
    return (await client.get("/api/account")).data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function listCurrencies() {
  try {
    return (await client.get("/api/currencies")).data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
