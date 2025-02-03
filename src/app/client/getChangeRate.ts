"use client";
import client from "./client";

export const getChangeRate = async (
  from: string | undefined,
  to: string | undefined,
) => {
  if (!from || !to) return 0;

  try {
    return (await client.get(`changeRate/${from}/${to}`)).data;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
