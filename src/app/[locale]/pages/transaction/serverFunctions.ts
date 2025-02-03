"use server";
import client from "@/app/client/client";
import { Transaction } from "@/app/types";
import { revalidatePath } from "next/cache";

export const addTransaction = async (transaction: Transaction) => {
  try {
    await client.post("/api/transaction", transaction);
    revalidatePath("/pages/transaction");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add transaction");
  }
};

export async function listTransactions() {
  try {
    return (await client.get("/api/transaction")).data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
