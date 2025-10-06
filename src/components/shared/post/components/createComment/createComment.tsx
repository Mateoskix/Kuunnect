import { useCreateComment } from "@/utils/hooks/comments/useCreateComment";
import { useGetUser } from "@/utils/hooks/user/useGetUser";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CreateCommentProps {
  post_id: string;
  onCommentCreated: () => void;
}

const CreateComment = ({ post_id, onCommentCreated }: CreateCommentProps) => {
  const { isLoading, createComment, setContent, content, setImage, image } = useCreateComment(
    post_id,
    onCommentCreated
  );
  const user = useGetUser();
  if (!user) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment();
  };

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
        {image && (
          <div className="w-48 h-48 overflow-hidden rounded-t-xl styled-box">
            <Image src={URL.createObjectURL(image)} alt="Comment image" fill />
          </div>
        )}
        <div className="flex flex-row justify-end gap-2">
          <button type="submit" className="styled-button" disabled={isLoading}>
            Add Comment
          </button>
          <button
            type="button"
            className="styled-button"
            disabled={isLoading}
            onClick={() => {
              const fileInput = document.createElement("input");
              fileInput.type = "file";
              fileInput.accept = "image/*";
              fileInput.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  setImage(file);
                }
              };
              fileInput.click();
            }}
          >
            <Paperclip size={15} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
