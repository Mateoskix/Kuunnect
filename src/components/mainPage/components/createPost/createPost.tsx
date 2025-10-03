"use client";
import React, { useRef } from "react";
import { useGetUser } from "@/utils/hooks/useGetUser";
import { Paperclip } from "lucide-react";
const CreatePost = () => {
  const user = useGetUser();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  if (!user) {
    return <></>;
  }
  return (
    <div className="styled-box">
      <div className="flex flex-col space-y-2">
        <input className="w-full ring-0 border-0 focus:outline-none" type="text" placeholder="Title" />
        <textarea 
          ref={textareaRef}
          className="w-full ring-0 border-0 focus:outline-none resize-none overflow-hidden"
          placeholder="What's on your mind?"
          rows={1}
          onInput={autoResize}
        />
        <div className="flex flex-row justify-end gap-2">
          <button className="styled-button">Create</button>
          <button className="styled-button"><Paperclip size={15} /></button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
