"use client";

import { useUserStore } from '../store/userStore';

export default function UserGreeting() {
  const { user, isLoading } = useUserStore();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Welcome, Guest!
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please sign in to see your personalized greeting.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            Hello, {user.name}! 👋
          </h3>
          <p className="text-indigo-100 text-sm">
            {user.email}
          </p>
        </div>
      </div>
      <div className="mt-4 text-sm text-indigo-100">
        Welcome back to your dashboard!
      </div>
    </div>
  );
}
