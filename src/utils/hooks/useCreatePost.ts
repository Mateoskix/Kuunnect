"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface UseCreatePostResult {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  createPost: () => Promise<void>;
  resetForm: () => void;
}

export const useCreatePost = (onSuccess?: () => void): UseCreatePostResult => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createPost = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("You must be logged in to create a post");
      }

      const { data, error: createError } = await supabase
        .from('posts')
        .insert({
          title: title.trim(),
          content: content.trim(),
        })
        .select()
        .single();

      if (createError) {
        throw new Error(createError.message);
      }

      if (data) {
        setSuccess(true);
        resetForm();
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setError(null);
    setSuccess(false);
  };

  return {
    title,
    content,
    setTitle,
    setContent,
    isLoading,
    error,
    success,
    createPost,
    resetForm,
  };
};
