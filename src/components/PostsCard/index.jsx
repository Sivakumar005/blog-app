import React from "react";
import { CalendarIcon } from "lucide-react";

export const PostsCard = ({ id, title, content, createdAt }) => {
  const truncateContent = (text, limit = 150) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
        {truncateContent(content)}
      </p>
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <CalendarIcon size={16} className="mr-1" />
        {new Date(createdAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

