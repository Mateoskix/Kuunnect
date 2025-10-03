"use client";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { PostProps } from "@/utils/types";

interface UseGetPostsResult {
  posts: PostProps[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMore: () => void;
  error: string | null;
}

export const useGetPosts = (limit: number = 20): UseGetPostsResult => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(
    async (offset: number = 0, append: boolean = false) => {
      const supabase = createClient();
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (fetchError) {
        setError(fetchError.message);
        setIsLoading(false);
        setIsLoadingMore(false);
        return;
      }

      if (data) {
        if (append) {
          setPosts((prevPosts) => [...prevPosts, ...data]);
        } else {
          setPosts(data);
        }
        setHasMore(data.length === limit);
      }

      setIsLoading(false);
      setIsLoadingMore(false);
    },
    [limit]
  );

  useEffect(() => {
    fetchPosts(0, false);
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      fetchPosts(posts.length, true);
    }
  }, [isLoadingMore, hasMore, posts.length, fetchPosts]);

  return { posts, isLoading, isLoadingMore, hasMore, loadMore, error };
};
