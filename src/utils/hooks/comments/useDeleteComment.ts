import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export const useDeleteComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteComment = async (commentId: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const {data: commentData, error: commentError} = await supabase
        .from("comments")
        .select("*")
        .eq("id", commentId)
        .single();
      if (commentError) {
        throw new Error(commentError.message);
      }
      if (commentData.image) {
        const { data: mediaData, error: mediaError } = await supabase.storage
          .from("posts_images")
          .remove([commentData.image]);
        if (mediaError) {
          throw new Error(mediaError.message);
        }
      }
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        setSuccess(true);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    deleteComment,
  };
};
