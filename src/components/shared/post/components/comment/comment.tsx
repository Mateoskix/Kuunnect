import React, { useEffect } from "react";
import { formatDate } from "@/utils/functions/formatDate";
import { CommentProps } from "@/utils/types";
import { useGetUser } from "@/utils/hooks/user/useGetUser";
import { Trash } from "lucide-react";
import { useDeleteComment } from "@/utils/hooks/comments/useDeleteComment";

const Comment = ({ content, created_at, user_id, id, onCommentDeleted }: CommentProps) => {
  const user = useGetUser();
  const { isLoading, error, success, deleteComment } = useDeleteComment();

  useEffect(() => {
    if (success && onCommentDeleted) {
      onCommentDeleted();
    }
  }, [success, onCommentDeleted]);

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
            {user?.id === user_id && (
              <button
                className="z-10 ml-2 bg-primary text-complement hover:bg-secondary rounded-full p-2 cursor-pointer"
                onClick={() => {
                  deleteComment(id);
                }}
              >
                <Trash size={16} />
              </button>
            )}
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
