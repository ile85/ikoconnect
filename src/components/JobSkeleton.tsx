export default function JobSkeleton() {
  return (
    <div className="animate-pulse p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 space-y-4">
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      <div className="h-10 mt-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    </div>
  );
}
