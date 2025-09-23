"use client";

import { useUserStore } from "../store/userStore";

export default function UserDisplayCard() {
  const { user, isLoading } = useUserStore();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            No user logged in
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign in to see your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-lg font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold truncate">
            {user.name}
          </h4>
          <p className="text-blue-100 text-sm truncate">
            {user.email}
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      </div>
      <div className="mt-4 text-xs text-blue-100">
        User ID: {user.id.substring(0, 8)}...
      </div>
    </div>
  );
}
