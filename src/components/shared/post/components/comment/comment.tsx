import React from "react";
import { formatDate } from "@/utils/functions/formatDate";
import { CommentProps } from "@/utils/types";

const Comment = ({ content, created_at }: CommentProps) => {


  return (
    <div className="styled-box p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 font-medium">
              USER
            </span>
          </div>
          <span className="text-xs text-gray-500 font-light">
            {formatDate(created_at)}
          </span>
        </div>
        <p className="text-gray-700 leading-relaxed break-all text-sm">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Comment;
