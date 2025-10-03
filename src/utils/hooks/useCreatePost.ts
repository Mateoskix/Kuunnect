"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface UseCreatePostResult {
  title: string;
  content: string;
  image: File | null;
  setImage: (image: File | null) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  createPost: () => Promise<void>;
}

export const useCreatePost = (onSuccess?: () => void): UseCreatePostResult => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
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

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("You must be logged in to create a post");
      }

      let imagePath = null;
      if (image) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("posts_images")
          .upload(`${user.id}/${Date.now()}_${image.name}`, image);
        if (uploadError) {
          throw new Error(uploadError.message);
        }
        imagePath = uploadData.path;
      }

      const { data, error } = await supabase
        .from("posts")
        .insert({
          title: title.trim(),
          content: content.trim(),
          image: imagePath,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setSuccess(true);
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

  return {
    title,
    content,
    setTitle,
    setContent,
    image,
    setImage,
    isLoading,
    error,
    success,
    createPost,
  };
};
