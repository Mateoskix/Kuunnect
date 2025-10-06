import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const useCreateComment = (post_id: string, onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const createComment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!post_id) {
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
        .from("comments")
        .insert({ post_id: post_id, content: content.trim(), user_id: user?.id, image: imagePath })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        if (onSuccess) {
          onSuccess();
          setContent("");
          setImage(null);
        }
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
    createComment,
    content,
    setContent,
    image,
    setImage,
  };
};
