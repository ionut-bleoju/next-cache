import { cookies } from 'next/headers';

export default async function ServerDateDisplay() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const currentDate = new Date().toLocaleString();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Server Component Date
      </h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Current Date:</span> {currentDate}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Cookies found: {allCookies.length}
        </p>
        {allCookies.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cookie names:
            </p>
            <div className="flex flex-wrap gap-1">
              {allCookies.map((cookie) => (
                <span
                  key={cookie.name}
                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                >
                  {cookie.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

