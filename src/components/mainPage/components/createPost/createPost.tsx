"use client";
import React, { useRef } from "react";
import { useGetUser } from "@/utils/hooks/useGetUser";
import { useCreatePost } from "@/utils/hooks/useCreatePost";
import { Paperclip } from "lucide-react";
import Image from "next/image";

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const user = useGetUser();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const {
    title,
    content,
    setTitle,
    setContent,
    isLoading,
    error,
    createPost,
    image,
    setImage,
  } = useCreatePost(onPostCreated);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="styled-box">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          className="w-full ring-0 border-0 focus:outline-none"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
        <textarea
          ref={textareaRef}
          className="w-full ring-0 border-0 focus:outline-none resize-none overflow-hidden"
          placeholder="What's on your mind?"
          rows={1}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onInput={autoResize}
          disabled={isLoading}
        />
        {image && (
          <div className="w-48 h-48 overflow-hidden rounded-t-xl styled-box">
            <Image src={URL.createObjectURL(image)} alt="Post image" fill />
          </div>
        )}
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <div className="flex flex-row justify-end gap-2">
          <button 
            type="submit" 
            className="styled-button" 
            disabled={isLoading || !title.trim() || !content.trim()}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
          <button 
            type="button" 
            className="styled-button"
            disabled={isLoading}
            onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'image/*';
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

export default CreatePost;
