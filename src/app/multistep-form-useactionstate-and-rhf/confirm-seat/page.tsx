export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<"seat", string[]>>;
}) {
  const { seat } = await searchParams;
  return (
    <h1>Hurray! You have booked the following seats: {seat.join(", ")}</h1>
  );
}
