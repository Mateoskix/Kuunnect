import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const useCreateComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");

  const createComment = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!postId) {
        throw new Error("Post ID is required to create a comment");
      }

      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw new Error(userError.message);
      }
      if (!user) {
        throw new Error("You must be logged in to create a comment");
      }

      const { data, error } = await supabase
        .from("comments")
        .insert({ post_id: postId, content: content.trim(), user_id: user?.id })
        .select()
        .single();

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
    createComment,
    content,
    setContent,
    setPostId,
  };
};
