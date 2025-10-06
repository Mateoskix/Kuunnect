import { useCreateComment } from "@/utils/hooks/useCreateComment";
import React, { useEffect } from "react";

interface CreateCommentProps {
  post_id: string;
  onCommentCreated: () => void;
}

const CreateComment = ({ post_id, onCommentCreated }: CreateCommentProps) => {
  const { isLoading, success, createComment, setContent, setPostId, content } = useCreateComment();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment();
  };

  useEffect(() => {
    if (success) {
      setContent("");
      onCommentCreated();
    }
  }, [success, onCommentCreated, setContent]);

  useEffect(() => {
    setPostId(post_id);
  }, [post_id, setPostId]);

  return (
    <div className="styled-box p-4 my-6 mx-4">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a comment"
          className="w-full h-12 p-2 border-0 rounded-md border-gray-300 resize-none focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
        />
        <div className="flex flex-row justify-end">
          <button type="submit" className="styled-button" disabled={isLoading}>
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
