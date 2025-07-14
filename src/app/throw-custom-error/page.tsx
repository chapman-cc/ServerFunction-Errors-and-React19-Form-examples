import throwCustomError from "@/actions/throw-custom-error";

export default async function page() {
  const response = await throwCustomError();
  return <div>throw custom error page</div>; // error was thrown so this line will never get rendered
}
