"use server";

export default async function throwGenericError() {
  throw new Error("I am generic");
}
