import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export const useDeletePosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deletePost = async (postId: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const { data, error: deleteError} = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .select();
      
      if (deleteError) {
        throw new Error(deleteError.message);
      }
      
      if (data && data.length > 0) {
        setSuccess(true);
      } else {
        throw new Error("Post not found or already deleted");
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
    deletePost,
  };
};
