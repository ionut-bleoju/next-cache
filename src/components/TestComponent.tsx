import { cookies } from "next/headers";

export default async function TestComponent() {
  const test = await cookies();
  console.log(test.getAll());
  return (
    <div>
      {test.getAll().map((cookie) => cookie.name)}
      {new Date().toISOString()}
    </div>
  );
}

