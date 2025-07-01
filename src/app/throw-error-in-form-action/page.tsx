import { Submit } from "./submit-button";

export default function page() {
  const handleSubmit = async (data: FormData) => {
    "use server";
    // wait for 5 sec to show pending state
    await new Promise((res) => setTimeout(res, 5000));
    const userName = data.get("user-name");
    throw new Error("Got user name: " + userName);
  };
  return (
    <form action={handleSubmit}>
      <label htmlFor="user-name">User Name</label>
      <input type="text" name="user-name" defaultValue="John Doe" />
      <Submit />
    </form>
  );
}
