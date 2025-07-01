import throwGenericError from "@/actions/throw-generic-error";

export default async function page() {
  const response = await throwGenericError();
  return <div>throw generic error page</div>; // error was thrown so this line will never get rendered
}
