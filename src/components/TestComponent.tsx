import { cookies } from "next/headers";

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function TestComponent() {
  // Add delay to make streaming visible
  await delay(2000);
  
  const test = await cookies();
  console.log(test.getAll());
  return (
    <div className="p-4 border border-green-500 rounded">
      <p className="font-bold">Streamed Content:</p>
      {test.getAll().map((cookie, i) => (
        <div key={i}>{cookie.name}</div>
      ))}
      <p className="text-sm text-gray-600">{new Date().toISOString()}</p>
    </div>
  );
}

