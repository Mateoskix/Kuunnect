"use client";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { CommentProps } from "@/utils/types";

interface UseGetCommentsResult {
  comments: CommentProps[];
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
  error: string | null;
}

export const useGetComments = (postId: string, limit: number = 3): UseGetCommentsResult => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(
    async (offset: number = 0, append: boolean = false) => {
      const supabase = createClient();
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("comments")
        .select("*, profiles(username)")
        .eq("post_id", postId)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit + 1);

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      if (data) {
        const displayData = data.slice(0, limit);
        if (append) {
          setComments((prevComments) => [...prevComments, ...displayData]);
        } else {
          setComments(displayData);
        }
        setHasMore(data.length > limit);
      }

    },
    [postId, limit]
  );

  useEffect(() => {
    if (postId) {
      fetchComments(0, false);
    }
  }, [postId, fetchComments]);

  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchComments(comments.length, true);
    }
  }, [hasMore, comments.length, fetchComments]);

  const refetch = useCallback(() => {
    setComments([]);
    setHasMore(true);
    fetchComments(0, false);
  }, [fetchComments]);

  return { comments, hasMore, loadMore, refetch, error };
};
